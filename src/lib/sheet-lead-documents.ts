import type { BrainDocument } from "./types";

const today = "2026-06-17";

type SheetLead = {
  serialNo: number;
  company: string;
  contactPerson: string;
  projectDetails: string;
  contractValue: string;
  charge?: string;
  paymentDue: string;
  paymentReceived: string;
  paymentRemarks: string;
  contractSignedStatus: string;
  communicationStatus: string;
  nextSteps: string;
  deadline: string;
  lastCommunicationDate: string;
  stage: string;
  potentialValueInr: number;
};

const leads: SheetLead[] = [
  { serialNo: 1, company: "Nexaflow Technologies", contactPerson: "Rajan Malhotra", projectDetails: "AI Workflow Automation", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "Already have an in-house AI team, not interested currently", nextSteps: "Pitch again in Q3 with product updates", deadline: "NA", lastCommunicationDate: "2026-01-10", stage: "Nurture", potentialValueInr: 0 },
  { serialNo: 2, company: "BrightPath Consulting", contactPerson: "Anita Desai", projectDetails: "", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "No update, follow-ups pending", nextSteps: "Complete company profile and send proposal", deadline: "NA", lastCommunicationDate: "2026-01-22", stage: "Contacted", potentialValueInr: 0 },
  { serialNo: 3, company: "GreenLeaf Finance", contactPerson: "Suresh Bansal", projectDetails: "WhatsApp PA Bot", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "First meeting completed", nextSteps: "Build WhatsApp employee reporting bot demo", deadline: "NA", lastCommunicationDate: "2026-01-15", stage: "Contacted", potentialValueInr: 0 },
  { serialNo: 4, company: "TechNova Solutions", contactPerson: "Vikram Ahuja", projectDetails: "AI Integration Suite", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "Email sent about services, 2 initial meetings done", nextSteps: "Follow-up mail sent", deadline: "NA", lastCommunicationDate: "2026-02-01", stage: "Contacted", potentialValueInr: 0 },
  { serialNo: 5, company: "Horizon Health AI", contactPerson: "Dr. Priyanka Mehta", projectDetails: "Clinical AI Assistant", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "Initial meeting done, asked to wait until plan is finalized", nextSteps: "Send final proposal", deadline: "NA", lastCommunicationDate: "2026-02-05", stage: "Contacted", potentialValueInr: 0 },
  { serialNo: 6, company: "Vertex Media Group", contactPerson: "Nikhil Chadha", projectDetails: "AI Content Generation", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "Initial meeting done to understand problem", nextSteps: "Create sample AI content pieces, share cost model", deadline: "NA", lastCommunicationDate: "2026-01-20", stage: "Contacted", potentialValueInr: 0 },
  { serialNo: 7, company: "ClearVision Realty", contactPerson: "Rohit Gupta", projectDetails: "Property AI Chatbot", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "Made property listing demo", nextSteps: "Schedule follow-up meeting", deadline: "2026-03-10", lastCommunicationDate: "2026-02-20", stage: "Contacted", potentialValueInr: 0 },
  { serialNo: 8, company: "Zephyr Logistics", contactPerson: "Amir Shaikh", projectDetails: "Route Optimization AI", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "First demo shared", nextSteps: "Refine demo based on feedback", deadline: "2026-03-15", lastCommunicationDate: "2026-02-18", stage: "Contacted", potentialValueInr: 0 },
  { serialNo: 9, company: "Pinnacle EdTech", contactPerson: "Swati Kulkarni", projectDetails: "Learning Analytics AI", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "Pilot video sent", nextSteps: "Await feedback on pilot", deadline: "2026-03-20", lastCommunicationDate: "2026-02-22", stage: "Contacted", potentialValueInr: 0 },
  { serialNo: 10, company: "SkyBridge Ventures", contactPerson: "Harish Nambiar", projectDetails: "AI Dashboard", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "", nextSteps: "", deadline: "", lastCommunicationDate: "", stage: "New", potentialValueInr: 0 },
  { serialNo: 11, company: "PureData Analytics", contactPerson: "Shobha Rajan", projectDetails: "Data Intelligence Platform", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "First demo ready", nextSteps: "Finalize and share", deadline: "2026-03-22", lastCommunicationDate: "2026-02-28", stage: "Contacted", potentialValueInr: 0 },
  { serialNo: 12, company: "GrowthSpark Agency", contactPerson: "Manav Seth", projectDetails: "AI Marketing Automation", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "", nextSteps: "", deadline: "", lastCommunicationDate: "", stage: "New", potentialValueInr: 0 },
  { serialNo: 13, company: "BluePeak Manufacturing", contactPerson: "Rajiv Tandon", projectDetails: "AI Quality Control", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "", nextSteps: "", deadline: "", lastCommunicationDate: "", stage: "New", potentialValueInr: 0 },
  { serialNo: 14, company: "Meridian Retail Group", contactPerson: "Pooja Saini", projectDetails: "Customer Behavior AI", contractValue: "TBD", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "Not Signed", communicationStatus: "Developed prototype for review", nextSteps: "Improve recommendation engine", deadline: "2026-04-15", lastCommunicationDate: "2026-03-10", stage: "Signed", potentialValueInr: 0 },
  { serialNo: 15, company: "AlphaWave Studios", contactPerson: "Tanmay Bose", projectDetails: "AI Avatar Videos", contractValue: "", charge: "Proposed 1,800 per minute", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "Sent 2 pilot videos", nextSteps: "", deadline: "", lastCommunicationDate: "", stage: "Contacted", potentialValueInr: 0 },
  { serialNo: 16, company: "OptiTrade Platform", contactPerson: "Sandeep Arora", projectDetails: "Trading Analytics AI", contractValue: "Proposed 1,80,000", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "Quotation sent", nextSteps: "Revise plan and execution strategy", deadline: "2026-03-28", lastCommunicationDate: "2026-02-25", stage: "Proposal", potentialValueInr: 180000 },
  { serialNo: 17, company: "DataPeak Investments", contactPerson: "Gaurav Singhania", projectDetails: "AI Videos, Trading Dashboard", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "", nextSteps: "", deadline: "", lastCommunicationDate: "", stage: "New", potentialValueInr: 0 },
  { serialNo: 18, company: "CineVerse Productions", contactPerson: "Rahul Kapoor", projectDetails: "Documentary AI Project", contractValue: "Proposed 12,00,000", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "", nextSteps: "", deadline: "", lastCommunicationDate: "", stage: "New", potentialValueInr: 1200000 },
  { serialNo: 19, company: "WealthPath Advisory", contactPerson: "Deepa Mohan", projectDetails: "MF Tracking Platform", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "", nextSteps: "", deadline: "", lastCommunicationDate: "", stage: "New", potentialValueInr: 0 },
  { serialNo: 20, company: "InnoCore Technologies", contactPerson: "Arjun Bhatia", projectDetails: "AI Integration", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "Proposed multiple services", nextSteps: "", deadline: "", lastCommunicationDate: "", stage: "Contacted", potentialValueInr: 0 },
  { serialNo: 21, company: "SilverScreen Films", contactPerson: "Anil Devgan", projectDetails: "Short Film + Promo", contractValue: "1,20,000 + 90,000", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "Pilot videos sent", nextSteps: "Setup meeting", deadline: "", lastCommunicationDate: "2026-04-22", stage: "Contacted", potentialValueInr: 210000 },
  { serialNo: 22, company: "CloverTech Startup", contactPerson: "Neha Jain", projectDetails: "AI Workflow, AI Videos", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "Proposal sent, pilot video shared", nextSteps: "", deadline: "", lastCommunicationDate: "2026-04-20", stage: "Contacted", potentialValueInr: 0 },
  { serialNo: 23, company: "CoreFusion Labs", contactPerson: "Sunil Sharma", projectDetails: "AI Reels", contractValue: "", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "", communicationStatus: "", nextSteps: "", deadline: "", lastCommunicationDate: "", stage: "New", potentialValueInr: 0 },
  { serialNo: 24, company: "BlueHorizon Capital", contactPerson: "Arvind Lal", projectDetails: "Investment AI Dashboard", contractValue: "5500", charge: "", paymentDue: "", paymentReceived: "5500", paymentRemarks: "", contractSignedStatus: "Completed", communicationStatus: "Finished", nextSteps: "", deadline: "", lastCommunicationDate: "", stage: "Completed", potentialValueInr: 5500 },
  { serialNo: 25, company: "UrbanEdge Design", contactPerson: "Ritu Malhotra", projectDetails: "Brand AI Videos", contractValue: "6000", charge: "2,500 per min", paymentDue: "", paymentReceived: "6000", paymentRemarks: "", contractSignedStatus: "Completed", communicationStatus: "Finished", nextSteps: "", deadline: "", lastCommunicationDate: "", stage: "Completed", potentialValueInr: 6000 },
  { serialNo: 26, company: "SmartNest IoT", contactPerson: "Rajesh Taneja", projectDetails: "SAAS Platform", contractValue: "5000 per month", charge: "", paymentDue: "", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "SaaS", communicationStatus: "Prototype testing in progress", nextSteps: "CRM integration, schedule Monday meeting", deadline: "2026-04-25", lastCommunicationDate: "2026-04-20", stage: "Signed", potentialValueInr: 5000 },
  { serialNo: 27, company: "ProVision Analytics", contactPerson: "Manish Rana", projectDetails: "Trading Platform", contractValue: "4,20,000", charge: "", paymentDue: "1,40,000", paymentReceived: "40000", paymentRemarks: "", contractSignedStatus: "Signed", communicationStatus: "Waiting for data APIs", nextSteps: "Follow up on payment milestones", deadline: "2026-04-28", lastCommunicationDate: "2026-04-22", stage: "Signed", potentialValueInr: 420000 },
  { serialNo: 28, company: "MediaBlast Studios", contactPerson: "Shruti Nair", projectDetails: "120 Promo Videos", contractValue: "2,80,000", charge: "2000 Per Video", paymentDue: "1,20,000", paymentReceived: "1,00,000", paymentRemarks: "", contractSignedStatus: "E-Signed", communicationStatus: "Phase 3 billing raised - 110 videos completed", nextSteps: "Bill raise, await payment", deadline: "2026-04-22", lastCommunicationDate: "2026-04-28", stage: "Signed", potentialValueInr: 280000 },
  { serialNo: 29, company: "Edify Learning", contactPerson: "Harpreet Kaur", projectDetails: "96 Education Videos", contractValue: "96,000", charge: "1000 Per Video", paymentDue: "14000", paymentReceived: "", paymentRemarks: "", contractSignedStatus: "Sent", communicationStatus: "Video 2 ready, fixing videos 3 & 4", nextSteps: "Send quotation, request new content batch", deadline: "2026-03-22", lastCommunicationDate: "2026-03-20", stage: "Proposal", potentialValueInr: 96000 },
  { serialNo: 30, company: "ApexBuild Infra", contactPerson: "Amit Goswami", projectDetails: "Social Platform", contractValue: "38000", charge: "", paymentDue: "", paymentReceived: "19000", paymentRemarks: "", contractSignedStatus: "E-Signed", communicationStatus: "60% project complete", nextSteps: "", deadline: "", lastCommunicationDate: "", stage: "Signed", potentialValueInr: 38000 },
];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const normalizeLeadStage = (stage: string) => {
  if (stage === "Completed") return "Completed";
  if (stage === "Proposal" || stage === "Signed") return "Project Started";
  return "Old Leads";
};

export const sheetLeadDocuments: BrainDocument[] = leads.map((lead) => {
  const normalizedStage = normalizeLeadStage(lead.stage);
  const docId = `lead-sheet-${slugify(lead.company)}-${lead.serialNo}`;
  return {
    id: docId,
    type: "lead",
    title: `${lead.company} — ${lead.contactPerson}`,
    status: normalizedStage,
    owner: "Sales Team",
    updatedAt: today,
    tags: ["lead", lead.stage, "CRM"],
    fields: {
      company: lead.company,
      contactPerson: lead.contactPerson,
      projectDetails: lead.projectDetails,
      contractValue: lead.contractValue,
      charge: lead.charge || "",
      paymentDue: lead.paymentDue,
      paymentReceived: lead.paymentReceived,
      paymentRemarks: lead.paymentRemarks,
      contractSignedStatus: lead.contractSignedStatus,
      communicationStatus: lead.communicationStatus,
      nextSteps: lead.nextSteps,
      deadline: lead.deadline,
      lastCommunicationDate: lead.lastCommunicationDate,
      stage: normalizedStage,
      potentialValueInr: lead.potentialValueInr,
      source: "CRM Sheet",
    },
    body: `Imported lead from Client Communications sheet.\n\nCompany: ${lead.company}\nContact: ${lead.contactPerson}\nProject: ${lead.projectDetails || "Not provided"}\nContract Value: ${lead.contractValue || "Not provided"}\nCharge: ${lead.charge || "Not specified"}\nPayment Due: ${lead.paymentDue || "None"}\nPayment Received: ${lead.paymentReceived || "None"}\nContract Status: ${lead.contractSignedStatus || "Not signed"}\nCommunication Status: ${lead.communicationStatus || "No updates"}\nNext Steps: ${lead.nextSteps || "TBD"}\nDeadline: ${lead.deadline || "No deadline set"}\nLast Contact: ${lead.lastCommunicationDate || "Not recorded"}\nStage: ${normalizedStage}`,
  };
});
