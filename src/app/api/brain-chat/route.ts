import { NextRequest, NextResponse } from "next/server";

import type { BrainDocument, ChatMessage } from "../../../lib/types";
import { supabase } from "../../../lib/supabase";

type BrainChatRequest = {
  prompt?: string;
  documents?: BrainDocument[];
  messages?: ChatMessage[];
  writeMode?: boolean;
};

const fieldText = (document: BrainDocument, key: string) => String(document.fields[key] ?? "");
const fieldNumber = (document: BrainDocument, key: string) => Number(document.fields[key] ?? 0);

const compactDocument = (document: BrainDocument) => {
  if (document.type === "employee") {
    return {
      id: document.id,
      type: document.type,
      name: fieldText(document, "name"),
      role: fieldText(document, "role") || fieldText(document, "department"),
      status: fieldText(document, "status"),
      currentSalaryRaw: fieldText(document, "currentSalaryRaw"),
      monthlySalaryInr: fieldNumber(document, "monthlySalaryInr"),
      dateOfJoining: fieldText(document, "dateOfJoining"),
      dateOfLeaving: fieldText(document, "dateOfLeaving"),
      panCardStatus: fieldText(document, "panCardStatus"),
      aadhaarCardStatus: fieldText(document, "aadhaarCardStatus"),
      bankDetailsStatus: fieldText(document, "bankDetailsStatus")
    };
  }

  if (document.type === "lead") {
    return {
      id: document.id,
      type: document.type,
      company: fieldText(document, "company"),
      contactPerson: fieldText(document, "contactPerson"),
      stage: fieldText(document, "stage"),
      projectDetails: fieldText(document, "projectDetails"),
      contractValue: fieldText(document, "contractValue"),
      potentialValueInr: fieldNumber(document, "potentialValueInr"),
      communicationStatus: fieldText(document, "communicationStatus"),
      nextSteps: fieldText(document, "nextSteps"),
      deadline: fieldText(document, "deadline"),
      lastCommunicationDate: fieldText(document, "lastCommunicationDate")
    };
  }

  if (document.type === "project") {
    return {
      id: document.id,
      type: document.type,
      title: document.title,
      status: document.status,
      owner: document.owner,
      health: fieldText(document, "health"),
      risk: fieldText(document, "risk"),
      progress: fieldNumber(document, "progress"),
      dueDate: fieldText(document, "dueDate"),
      budgetInr: fieldNumber(document, "budgetInr")
    };
  }

  return {
    id: document.id,
    type: document.type,
    title: document.title,
    status: document.status,
    owner: document.owner,
    updatedAt: document.updatedAt,
    fields: document.fields
  };
};

// Helper function to extract text response payload from Gemini API
const extractGeminiText = (payload: unknown) => {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const response = payload as {
    candidates?: Array<{
      finishReason?: string;
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  return (
    response.candidates
      ?.flatMap((candidate) => candidate.content?.parts ?? [])
      .map((item) => item.text ?? "")
      .filter(Boolean)
      .join("\n") ?? ""
  );
};

function generateLocalFallbackAnswer({
  prompt,
  companyMemory = [],
  taskAssignments = []
}: {
  prompt: string;
  companyMemory: Record<string, unknown>[];
  taskAssignments: Array<{
    id: string;
    title: string;
    status: string;
    dueDate: string;
    assignedEmployeeIds: string[];
    assignedEmployeeNames: string[];
  }>;
}): string {
  const p = prompt.toLowerCase().trim();

  // 1. Check if user is asking about an employee
  const employees = companyMemory.filter((d) => d.type === "employee");
  const matchedEmp = employees.find((emp) => {
    const name = String(emp.name ?? "").toLowerCase();
    const parts = name.split(/\s+/).filter((s) => s.length > 1);
    return name && (p.includes(name) || parts.some((part) => p.includes(part)));
  });

  if (matchedEmp) {
    const name = String(matchedEmp.name ?? "Employee");
    const role = String(matchedEmp.role ?? "Team Member");
    const status = String(matchedEmp.status ?? "Active");
    const salary = Number(matchedEmp.monthlySalaryInr ?? 0);
    const dateOfJoining = String(matchedEmp.dateOfJoining ?? "N/A");

    const lines = [
      `Based on company records for **${name}**:`,
      `- **Role / Department**: ${role}`,
      `- **Status**: ${status}`,
      `- **Monthly Salary**: ₹${salary.toLocaleString("en-IN")}`,
      `- **Date of Joining**: ${dateOfJoining}`
    ];

    if (matchedEmp.panCardStatus || matchedEmp.aadhaarCardStatus || matchedEmp.bankDetailsStatus) {
      lines.push(
        `- **Documents**: PAN (${matchedEmp.panCardStatus || "Pending"}), Aadhaar (${matchedEmp.aadhaarCardStatus || "Pending"}), Bank Details (${matchedEmp.bankDetailsStatus || "Pending"})`
      );
    }

    // Check tasks assigned to this employee
    const empTasks = taskAssignments.filter(
      (t) =>
        (t.assignedEmployeeNames || []).some(
          (n) => n.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(n.toLowerCase())
        ) ||
        (t.assignedEmployeeIds || []).includes(String(matchedEmp.id ?? ""))
    );
    if (empTasks.length > 0) {
      lines.push(`- **Assigned Tasks**:`);
      empTasks.forEach((t) => {
        lines.push(`  • ${t.title} (Status: ${t.status}, Due: ${t.dueDate || "No deadline"})`);
      });
    }

    // Check projects assigned or owned
    const relatedProjects = companyMemory.filter((d) => {
      if (d.type !== "project") return false;
      const owner = String(d.owner ?? "").toLowerCase();
      const assigned = Array.isArray(d.assignedEmployees)
        ? (d.assignedEmployees as string[]).map((a) => a.toLowerCase())
        : [];
      return owner.includes(name.toLowerCase()) || assigned.some((a) => a.includes(name.toLowerCase()));
    });
    if (relatedProjects.length > 0) {
      lines.push(`- **Associated Projects**:`);
      relatedProjects.forEach((proj) => {
        lines.push(`  • ${proj.title} (Status: ${proj.status}, Progress: ${proj.progress}%)`);
      });
    }

    return lines.join("\n");
  }

  // 2. Check if asking about a lead or company
  const leads = companyMemory.filter((d) => d.type === "lead");
  const matchedLead = leads.find((l) => {
    const company = String(l.company ?? "").toLowerCase();
    const contact = String(l.contactPerson ?? "").toLowerCase();
    return (company && p.includes(company)) || (contact && p.includes(contact));
  });

  if (matchedLead) {
    const val = Number(matchedLead.potentialValueInr ?? 0);
    return [
      `Here is the lead information for **${matchedLead.company ?? "Lead"}**:`,
      `- **Contact Person**: ${matchedLead.contactPerson || "N/A"}`,
      `- **Pipeline Stage**: ${matchedLead.stage || "Active"}`,
      `- **Project Details**: ${matchedLead.projectDetails || "N/A"}`,
      `- **Potential Value**: ₹${val.toLocaleString("en-IN")}`,
      `- **Communication Status**: ${matchedLead.communicationStatus || "N/A"}`,
      `- **Next Steps**: ${matchedLead.nextSteps || "N/A"}`,
      `- **Deadline**: ${matchedLead.deadline || "N/A"}`
    ].join("\n");
  }

  // 3. Check if asking about a project
  const projects = companyMemory.filter((d) => d.type === "project");
  const matchedProject = projects.find((proj) => {
    const title = String(proj.title ?? "").toLowerCase();
    return title && p.includes(title);
  });

  if (matchedProject) {
    const lines = [
      `Here are the project details for **${matchedProject.title}**:`,
      `- **Status**: ${matchedProject.status || "Active"}`,
      `- **Owner / Manager**: ${matchedProject.owner || "N/A"}`,
      `- **Progress**: ${matchedProject.progress || 0}%`,
      `- **Health / Risk**: ${matchedProject.health || "Good"} (Risk: ${matchedProject.risk || "Low"})`,
      `- **Budget**: ₹${Number(matchedProject.budgetInr || 0).toLocaleString("en-IN")}`,
      `- **Due Date**: ${matchedProject.dueDate || "N/A"}`
    ];
    if (Array.isArray(matchedProject.assignedEmployees) && matchedProject.assignedEmployees.length > 0) {
      lines.push(`- **Assigned Employees**: ${(matchedProject.assignedEmployees as string[]).join(", ")}`);
    }
    return lines.join("\n");
  }

  // 4. Listing employees or salaries
  if (/\b(employees?|staff|salaries|salary|team)\b/i.test(p)) {
    if (employees.length === 0) return "No employee records found in company memory.";
    const lines = ["**Company Employees & Compensation:**"];
    employees.forEach((emp) => {
      lines.push(
        `- ${emp.name} - ₹${Number(emp.monthlySalaryInr || 0).toLocaleString("en-IN")} - ${emp.status || "Active"} (${emp.role || "Staff"})`
      );
    });
    return lines.join("\n");
  }

  // 5. Listing leads / CRM
  if (/\b(leads?|clients?|deals?|pipeline|crm)\b/i.test(p)) {
    if (leads.length === 0) return "No lead records found in company memory.";
    const lines = ["**Current CRM Leads:**"];
    leads.forEach((l) => {
      lines.push(
        `- ${l.contactPerson || "Lead"} - ${l.company || "Unknown"} - Stage: ${l.stage || "New"} (Value: ₹${Number(l.potentialValueInr || 0).toLocaleString("en-IN")})`
      );
    });
    return lines.join("\n");
  }

  // 6. Listing tasks
  if (/\b(tasks?|assignments?|pending|todo)\b/i.test(p)) {
    if (taskAssignments.length === 0) return "No tasks found in current memory.";
    const lines = ["**Company Tasks:**"];
    taskAssignments.forEach((t) => {
      const assignees = t.assignedEmployeeNames?.length ? ` [Assigned: ${t.assignedEmployeeNames.join(", ")}]` : "";
      lines.push(`- **${t.title}** - Status: ${t.status} | Due: ${t.dueDate || "None"}${assignees}`);
    });
    return lines.join("\n");
  }

  return "I searched the company memory, but could not find a specific record matching your request. You can ask about any team member (e.g. 'tell me about Yash' or 'Riya'), 'show all employees', 'show leads', or 'view tasks'.";
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  const body = (await request.json()) as BrainChatRequest;
  const prompt = body.prompt?.trim();
  const documents = body.documents ?? [];

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  const companyMemory = documents.map(compactDocument) as Record<string, unknown>[];
  const recentMessages = (body.messages ?? []).slice(-8).map((message) => ({
    role: message.role,
    content: message.content
  }));
  const isLongListRequest = /\b(all|list|show|export|contacts?|everyone|complete)\b/i.test(prompt);

  // --- Fetch tasks from Supabase to include assignment data ---
  let taskAssignments: Array<{
    id: string;
    title: string;
    status: string;
    dueDate: string;
    assignedEmployeeIds: string[];
    assignedEmployeeNames: string[];
  }> = [];

  try {
    const { data: taskRows } = await supabase.from("tasks").select("*");
    if (taskRows && taskRows.length > 0) {
      // Build employee ID → name map from the documents
      const employeeNameMap: Record<string, string> = {};
      for (const doc of documents) {
        if (doc.type === "employee") {
          const name = String(doc.fields?.name ?? doc.title ?? "").replace(/ - .+$/, "").trim();
          if (name) employeeNameMap[doc.id] = name;
        }
      }

      taskAssignments = taskRows.map((row: Record<string, unknown>) => {
        const empIds: string[] = (row.assigned_employee_ids as string[]) || [];
        return {
          id: row.id as string,
          title: row.title as string,
          status: row.status as string,
          dueDate: row.due_date as string,
          assignedEmployeeIds: empIds,
          assignedEmployeeNames: empIds.map((eid) => employeeNameMap[eid] || eid)
        };
      });

      // Enrich project entries in companyMemory with assigned employee names
      for (const memItem of companyMemory) {
        if (memItem.type === "project") {
          const projectTitle = String(memItem.title ?? "").toLowerCase();
          const relatedTasks = taskAssignments.filter((t) => {
            const taskTitle = t.title.toLowerCase();
            return taskTitle.includes(projectTitle) || projectTitle.includes(taskTitle);
          });
          const assignedNames = Array.from(
            new Set(relatedTasks.flatMap((t) => t.assignedEmployeeNames))
          );
          if (assignedNames.length > 0) {
            memItem.assignedEmployees = assignedNames;
          }
        }
      }
    }
  } catch (err) {
    console.error("[brain-chat] Failed to fetch tasks for context:", err);
  }

  // Model fallback cascade: tries the primary model, and if it experiences high demand (503/429), fails over to backup models
  const candidateModels = Array.from(
    new Set(
      [
        process.env.GEMINI_MODEL,
        "gemini-3.6-flash",
        "gemini-3.5-flash",
        "gemini-3.5-flash-lite",
        "gemini-3.1-flash-lite",
        "gemini-3.7-flash"
      ].filter(Boolean) as string[]
    )
  );

  let answer = "";
  let finishReason = "";

  if (apiKey) {
    for (const model of candidateModels) {
      try {
        const apiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: "POST",
            headers: {
              "x-goog-api-key": apiKey,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              system_instruction: {
                parts: [
                  {
                    text:
                      "You are ComBrain, the private AI company brain for ComBrain AI's founder. Answer only from the provided company memory. Be direct, operational, and specific. When asked for lists, compute from the JSON fields and return the complete list. For CRM contact lists, format each item as `Name - Company - Stage`, one item per line, with no extra commentary after the list. For employee salary questions, use monthlySalaryInr and format each result as `Name - salary INR - status`, one employee per line. Do not use tables. Do not add unfinished parentheses. If there are no matches, say so clearly. If the founder asks to edit, move, add, or update records, explain the intended change clearly and ask for approval unless the portal has already provided an explicit update action. Never invent employees, salaries, leads, clients, or project facts that are not in memory. IMPORTANT: Each project has an 'owner' field (the project owner/manager) AND may have an 'assignedEmployees' field (the employees actively working on the project). The 'taskAssignments' section in memory contains tasks with the employees assigned to work on them. When asked who is assigned to or working on a project, check BOTH the project's assignedEmployees field AND the taskAssignments data. The owner is not necessarily the person doing the work — distinguish between 'owner' and 'assigned employees'."
                  }
                ]
              },
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: JSON.stringify({
                        founderQuestion: prompt,
                        writeMode: Boolean(body.writeMode),
                        recentMessages,
                        companyMemory,
                        taskAssignments: taskAssignments.length > 0 ? taskAssignments : undefined
                      })
                    }
                  ]
                }
              ],
              generationConfig: {
                maxOutputTokens: isLongListRequest ? 8192 : 2048,
                temperature: 0.2,
                thinkingConfig: {
                  thinkingLevel: isLongListRequest ? "minimal" : "low"
                }
              }
            })
          }
        );

        if (apiResponse.ok) {
          const payload = await apiResponse.json();
          const text = extractGeminiText(payload).trim();
          if (text) {
            answer = text;
            finishReason = payload?.candidates?.[0]?.finishReason ?? "";
            break; // Succeeded!
          }
        } else {
          const errPayload = await apiResponse.json().catch(() => null);
          const errMsg = errPayload?.error?.message ?? "";
          console.warn(`[brain-chat] Model ${model} returned HTTP ${apiResponse.status}: ${errMsg}. Trying next model...`);
        }
      } catch (networkErr) {
        console.warn(`[brain-chat] Network error for model ${model}:`, networkErr);
      }
    }
  }

  // If Gemini produced a valid answer, return it
  if (answer) {
    return NextResponse.json({
      answer:
        finishReason === "MAX_TOKENS"
          ? `${answer}\n\nThe model stopped because it hit the output limit. Ask me to continue if you need the rest.`
          : answer
    });
  }

  // Local Memory Fallback: If all Gemini models are experiencing high demand (503), quota limits (429), or server is offline,
  // answer accurately directly from the company memory and tasks so the user never sees high demand errors during demos!
  const localFallback = generateLocalFallbackAnswer({
    prompt,
    companyMemory,
    taskAssignments
  });

  return NextResponse.json({
    answer: localFallback
  });
}
