import type { BrainDocument } from "./types";
import { sheetEmployeeDocuments } from "./sheet-employee-documents";
import { sheetLeadDocuments } from "./sheet-lead-documents";

const today = "2026-06-17";

const employee = (
  id: string,
  title: string,
  fields: BrainDocument["fields"],
  body: string
): BrainDocument => ({
  id,
  type: "employee",
  title,
  status: String(fields.status),
  owner: "Founder Office",
  updatedAt: today,
  tags: ["employee", String(fields.department), String(fields.status)],
  fields,
  body
});

const project = (
  id: string,
  title: string,
  fields: BrainDocument["fields"],
  body: string
): BrainDocument => ({
  id,
  type: "project",
  title,
  status: String(fields.phase),
  owner: String(fields.owner),
  updatedAt: today,
  tags: ["ai-project", String(fields.phase), String(fields.health)],
  fields,
  body
});

const client = (
  id: string,
  title: string,
  fields: BrainDocument["fields"],
  body: string
): BrainDocument => ({
  id,
  type: "client",
  title,
  status: String(fields.relationshipStage),
  owner: String(fields.accountOwner),
  updatedAt: today,
  tags: ["client", String(fields.industry), String(fields.health)],
  fields,
  body
});

const lead = (
  id: string,
  title: string,
  fields: BrainDocument["fields"],
  body: string
): BrainDocument => ({
  id,
  type: "lead",
  title,
  status: String(fields.stage),
  owner: String(fields.owner),
  updatedAt: today,
  tags: ["lead", String(fields.stage), String(fields.source)],
  fields,
  body
});

const baseBrainDocuments: BrainDocument[] = [
  ...sheetEmployeeDocuments,
  /*
  employee(
    "emp-aisha-menon",
    "Aisha Menon - Head of Operations",
    {
      name: "Aisha Menon",
      role: "Head of Operations",
      department: "Operations",
      monthlySalaryInr: 220000,
      dateOfJoining: "2023-07-10",
      status: "Active",
      pan: "AXIPM4821K",
      aadhaar: "4382 9124 5501",
      email: "aisha.menon@combrain.com",
      phone: "+91 90000 11001",
      location: "Bengaluru",
      reportingTo: "Founder"
    },
    `Aisha owns operating cadence, internal process hygiene, vendor coordination, and founder follow-through. She maintains weekly execution reviews, project owner check-ins, invoice reminders, and hiring coordination. Current focus is turning scattered updates into repeatable operating rituals for ComBrain.`
  ),
  employee(
    "emp-rohan-iyer",
    "Rohan Iyer - AI Engineer",
    {
      name: "Rohan Iyer",
      role: "AI Engineer",
      department: "Engineering",
      monthlySalaryInr: 180000,
      dateOfJoining: "2024-01-15",
      status: "Active",
      pan: "BDQPI1934L",
      aadhaar: "7251 4902 1188",
      email: "rohan.iyer@combrain.com",
      phone: "+91 90000 11002",
      location: "Chennai",
      reportingTo: "Nikhil Verma"
    },
    `Rohan builds retrieval, prompt orchestration, and model evaluation workflows. He is strongest with Python, LangChain-style pipelines, embeddings, and API integration. Current assignments include Pinecone schema tests and retrieval quality checks for document-grounded answers.`
  ),
  employee(
    "emp-meera-kapoor",
    "Meera Kapoor - Product Designer",
    {
      name: "Meera Kapoor",
      role: "Product Designer",
      department: "Product",
      monthlySalaryInr: 155000,
      dateOfJoining: "2023-11-06",
      status: "Active",
      pan: "CQWPK6421J",
      aadhaar: "2198 3304 7762",
      email: "meera.kapoor@combrain.com",
      phone: "+91 90000 11003",
      location: "Mumbai",
      reportingTo: "Founder"
    },
    `Meera designs dashboards, CRM flows, document review surfaces, and founder-facing chat experiences. She is responsible for making dense operational data readable without turning the product into a marketing page.`
  ),
  employee(
    "emp-karan-shah",
    "Karan Shah - Full Stack Developer",
    {
      name: "Karan Shah",
      role: "Full Stack Developer",
      department: "Engineering",
      monthlySalaryInr: 165000,
      dateOfJoining: "2024-02-01",
      status: "Active",
      pan: "DLMPS9351Q",
      aadhaar: "6632 1188 9041",
      email: "karan.shah@combrain.com",
      phone: "+91 90000 11004",
      location: "Ahmedabad",
      reportingTo: "Nikhil Verma"
    },
    `Karan owns Next.js implementation, API routes, authentication, database integration, and deployability. He is the primary developer for internal tools and founder dashboards.`
  ),
  employee(
    "emp-nikhil-verma",
    "Nikhil Verma - Lead ML Engineer",
    {
      name: "Nikhil Verma",
      role: "Lead ML Engineer",
      department: "Engineering",
      monthlySalaryInr: 190000,
      dateOfJoining: "2023-09-18",
      status: "Active",
      pan: "EAVPV7108D",
      aadhaar: "8871 4409 1206",
      email: "nikhil.verma@combrain.com",
      phone: "+91 90000 11005",
      location: "Hyderabad",
      reportingTo: "Founder"
    },
    `Nikhil leads model strategy, evaluation standards, data privacy reviews, and production AI architecture. His current focus is SLM routing, document mutation safety, and quality gates before AI-generated changes are applied.`
  ),
  employee(
    "emp-priya-nair",
    "Priya Nair - Sales Lead",
    {
      name: "Priya Nair",
      role: "Sales Lead",
      department: "Sales",
      monthlySalaryInr: 145000,
      dateOfJoining: "2024-03-12",
      status: "Active",
      pan: "FJRPN2944M",
      aadhaar: "3401 2088 5510",
      email: "priya.nair@combrain.com",
      phone: "+91 90000 11006",
      location: "Kochi",
      reportingTo: "Founder"
    },
    `Priya manages inbound leads, qualification, follow-ups, proposal coordination, and CRM hygiene. Her pipeline focus is mid-market AI automation projects in healthcare, retail, and professional services.`
  ),
  employee(
    "emp-sanjay-rao",
    "Sanjay Rao - Customer Success Manager",
    {
      name: "Sanjay Rao",
      role: "Customer Success Manager",
      department: "Customer Success",
      monthlySalaryInr: 130000,
      dateOfJoining: "2024-04-08",
      status: "Active",
      pan: "GQRPR5502H",
      aadhaar: "9027 6610 4381",
      email: "sanjay.rao@combrain.com",
      phone: "+91 90000 11007",
      location: "Pune",
      reportingTo: "Aisha Menon"
    },
    `Sanjay owns onboarding, adoption tracking, renewal risk notes, meeting summaries, and client satisfaction follow-through. He keeps account context current for the founder.`
  ),
  employee(
    "emp-kavya-singh",
    "Kavya Singh - HR and Finance Executive",
    {
      name: "Kavya Singh",
      role: "HR and Finance Executive",
      department: "People",
      monthlySalaryInr: 95000,
      dateOfJoining: "2024-06-03",
      status: "Active",
      pan: "HSTPS3104C",
      aadhaar: "5504 2918 3370",
      email: "kavya.singh@combrain.com",
      phone: "+91 90000 11008",
      location: "Delhi",
      reportingTo: "Aisha Menon"
    },
    `Kavya maintains employee documents, payroll notes, invoice documentation, offer letters, policy acknowledgements, and monthly founder reports.`
  ),
  employee(
    "emp-imran-qureshi",
    "Imran Qureshi - Data Engineer",
    {
      name: "Imran Qureshi",
      role: "Data Engineer",
      department: "Engineering",
      monthlySalaryInr: 160000,
      dateOfJoining: "2024-05-20",
      status: "Active",
      pan: "JXYPQ8912N",
      aadhaar: "7166 4092 8803",
      email: "imran.qureshi@combrain.com",
      phone: "+91 90000 11009",
      location: "Lucknow",
      reportingTo: "Nikhil Verma"
    },
    `Imran manages data extraction, cleaning, schema mapping, vector ingestion prep, and migration utilities. He is accountable for moving client documents into reliable searchable corpora.`
  ),
  employee(
    "emp-devika-arora",
    "Devika Arora - Prompt Engineer",
    {
      name: "Devika Arora",
      role: "Prompt Engineer",
      department: "AI Delivery",
      monthlySalaryInr: 125000,
      dateOfJoining: "2025-01-09",
      status: "Probation",
      pan: "KLPPA4107R",
      aadhaar: "1088 7642 3125",
      email: "devika.arora@combrain.com",
      phone: "+91 90000 11010",
      location: "Jaipur",
      reportingTo: "Rohan Iyer"
    },
    `Devika creates prompt libraries, evaluation examples, response style guides, and project-specific AI behavior notes. She is currently building the founder tone and CRM answer templates for ComBrain.`
  ),
  */
  project(
    "proj-smartcrm",
    "SmartCRM AI Assistant",
    {
      client: "Internal - ComBrain AI",
      phase: "Build",
      owner: "Aarav Deshmukh",
      health: "Green",
      priority: "High",
      dueDate: "2026-10-15",
      budgetInr: 500000,
      progress: 65,
      risk: "Write-mode mutations need founder approval safeguards before production."
    },
    `Objective: Build an AI-powered CRM assistant that lets the founder query leads, pipeline, and client data through natural language chat.

Scope: Chat interface, document-grounded answers, lead stage management, contact search, and AI-proposed edits with approval workflow.

Current status: Core chat and read-mode are functional. Write-mode edit proposals and approval flow are in development.

Success metric: Founder can manage entire CRM pipeline from a single chat interface without switching tools.`
  ),
  project(
    "proj-whatsapp-bot",
    "WhatsApp Business Bot",
    {
      client: "Internal - ComBrain AI",
      phase: "Pilot",
      owner: "Harsh Gupta",
      health: "Green",
      priority: "High",
      dueDate: "2026-09-30",
      budgetInr: 350000,
      progress: 72,
      risk: "WhatsApp API rate limits may throttle broadcast messages during peak hours."
    },
    `Objective: Enable automated WhatsApp notifications to employees for task updates, welcome messages, and broadcast communications.

Scope: WhatsApp Cloud API integration, employee onboarding messages, task assignment alerts, webhook handling, and admin broadcast panel.

Current status: Pilot running with welcome messages and task notifications. Broadcast feature is being tested with admin controls.

Success metric: 90% of employees receive task updates within 2 minutes of assignment via WhatsApp.`
  ),
  project(
    "proj-doc-manager",
    "Employee Document Vault",
    {
      client: "Internal - ComBrain AI",
      phase: "QA",
      owner: "Megha Tiwari",
      health: "Green",
      priority: "Medium",
      dueDate: "2026-09-20",
      budgetInr: 200000,
      progress: 85,
      risk: "Google Drive OAuth token refresh needs monitoring for uninterrupted uploads."
    },
    `Objective: Centralize employee document management — offer letters, PAN cards, Aadhaar, bank details — with Google Drive integration.

Scope: Document upload to Drive, status tracking (Available/Missing), viewer modal, and per-employee document dashboard.

Current status: Upload and viewing are functional. QA is testing edge cases around file size limits and document format validation.

Success metric: All employee documents accessible from one dashboard with zero manual folder management.`
  ),
  project(
    "proj-ecommerce-ai",
    "ShopSense AI Product Recommender",
    {
      client: "UrbanStyle Fashion",
      phase: "Build",
      owner: "Tanvi Reddy",
      health: "Amber",
      priority: "High",
      dueDate: "2026-11-15",
      budgetInr: 1800000,
      progress: 40,
      risk: "Product catalog has inconsistent tagging which affects recommendation quality."
    },
    `Objective: Build a personalized product recommendation engine for an e-commerce fashion brand using browsing and purchase history.

Scope: Product embedding pipeline, collaborative filtering, real-time recommendation API, A/B testing framework, and analytics dashboard.

Current status: Product embeddings are generated. Building the recommendation API and integration with the storefront.

Success metric: Increase average order value by 15% and improve product discovery click-through rate by 25%.`
  ),
  project(
    "proj-clinic-scheduler",
    "ClinicFlow Appointment System",
    {
      client: "Harmony Health Clinics",
      phase: "Discovery",
      owner: "Riya Kapoor",
      health: "Amber",
      priority: "Medium",
      dueDate: "2026-12-01",
      budgetInr: 1200000,
      progress: 18,
      risk: "Multiple clinic locations have different scheduling rules that need unified handling."
    },
    `Objective: Create an AI-assisted appointment scheduling system that handles patient booking, rescheduling, and doctor availability management.

Scope: Multi-location support, doctor calendar sync, patient WhatsApp reminders, cancellation handling, and waitlist automation.

Current status: Discovery calls completed. Requirements gathered from 3 clinic locations. Starting architecture design.

Success metric: Reduce no-show rate by 30% and cut receptionist scheduling time by 50%.`
  ),
  project(
    "proj-invoice-ocr",
    "InvoiceIQ Extraction Engine",
    {
      client: "TrustBridge Finance",
      phase: "Build",
      owner: "Aarav Deshmukh",
      health: "Green",
      priority: "High",
      dueDate: "2026-10-30",
      budgetInr: 2200000,
      progress: 52,
      risk: "Handwritten invoices have lower OCR accuracy and need a manual review fallback."
    },
    `Objective: Automate invoice data extraction from PDF and image formats with AI-powered OCR and structured data output.

Scope: OCR processing, field extraction (vendor, amount, date, GST), confidence scoring, duplicate detection, and ERP-ready export.

Current status: Core extraction pipeline works for typed invoices. Building confidence scoring and the review queue for low-confidence extractions.

Success metric: Process 75% of invoices without manual data entry while maintaining 98% extraction accuracy.`
  ),
  project(
    "proj-campus-recruit",
    "CampusConnect Recruitment Platform",
    {
      client: "TechVista Solutions",
      phase: "Prototype",
      owner: "Vikram Chauhan",
      health: "Green",
      priority: "Medium",
      dueDate: "2026-11-30",
      budgetInr: 950000,
      progress: 30,
      risk: "Integration with multiple university portals requires custom adapters for each."
    },
    `Objective: Build a campus recruitment management platform that streamlines candidate tracking from application to offer.

Scope: University portal integration, resume parsing, interview scheduling, assessment tracking, offer letter generation, and analytics.

Current status: Resume parser and candidate pipeline UI are prototyped. Working on university portal connectors.

Success metric: Reduce time-to-hire for campus recruits by 40% and improve candidate experience scores.`
  ),
  project(
    "proj-supply-chain",
    "SupplyMind Demand Planner",
    {
      client: "GreenBasket Organics",
      phase: "Planning",
      owner: "Ishaan Pillai",
      health: "Green",
      priority: "High",
      dueDate: "2027-01-15",
      budgetInr: 2800000,
      progress: 12,
      risk: "Historical sales data has gaps in certain product categories that need interpolation."
    },
    `Objective: Forecast demand for perishable organic products to optimize inventory and reduce wastage.

Scope: Sales data analysis, seasonal demand modeling, supplier lead time tracking, wastage prediction, and reorder point optimization.

Current status: Planning phase. Data audit completed. Defining forecast model architecture and dashboard requirements.

Success metric: Reduce food wastage by 20% and improve stock availability to 95% for top-selling SKUs.`
  ),
  project(
    "proj-legal-review",
    "ContractLens Legal Analyzer",
    {
      client: "Apex Legal Associates",
      phase: "Discovery",
      owner: "Ananya Bhat",
      health: "Amber",
      priority: "Medium",
      dueDate: "2026-12-20",
      budgetInr: 1500000,
      progress: 15,
      risk: "Confidentiality requirements limit the sample contracts available for model training."
    },
    `Objective: Analyze legal contracts to flag non-standard clauses, extract key terms, and generate comparison summaries.

Scope: PDF parsing, clause classification, risk flagging, playbook comparison, exportable review notes, and matter-level access control.

Current status: Discovery phase. Initial meetings with legal team completed. Preparing sanitized contract samples for prototype.

Success metric: Reduce first-pass contract review time by 35% without compromising legal oversight.`
  ),
  project(
    "proj-founder-dashboard",
    "Founder Command Center",
    {
      client: "Internal - ComBrain AI",
      phase: "Build",
      owner: "Simran Kaur",
      health: "Green",
      priority: "High",
      dueDate: "2026-10-01",
      budgetInr: 400000,
      progress: 70,
      risk: "Real-time data aggregation from multiple sources may cause dashboard load time issues."
    },
    `Objective: Build a unified command center dashboard for the founder showing employees, projects, CRM, tasks, payroll, and key metrics at a glance.

Scope: Dashboard cards, animated metrics, project health overview, employee status summary, pipeline value tracking, and AI chat integration.

Current status: Core dashboard layout and animated stats are complete. Integrating real-time data from all modules.

Success metric: Founder gets complete business overview in under 10 seconds without navigating multiple screens.`
  ),
  client(
    "client-nova-retail",
    "Nova Retail Labs",
    {
      company: "Nova Retail Labs",
      industry: "Retail",
      relationshipStage: "Active Client",
      health: "Green",
      accountOwner: "Sanjay Rao",
      primaryContact: "Suresh Kumar, COO",
      annualValueInr: 4800000,
      renewalDate: "2027-02-28",
      openProjects: ["TalentPulse HR Copilot", "Retail Demand Forecaster"],
      nextAction: "Send combined pilot success dashboard before Friday review."
    },
    `Nova Retail Labs is a strategic retail client with two active AI programs. The account has strong executive sponsorship and a healthy expansion path if the demand forecasting pilot proves ROI. Current relationship tone is collaborative and fast-moving.`
  ),
  client(
    "client-medicore",
    "MediCore Clinics",
    {
      company: "MediCore Clinics",
      industry: "Healthcare",
      relationshipStage: "Onboarding",
      health: "Green",
      accountOwner: "Sanjay Rao",
      primaryContact: "Dr. Neha Raman, Medical Director",
      annualValueInr: 3600000,
      renewalDate: "2027-04-15",
      openProjects: ["Clinic Voice Notes SLM"],
      nextAction: "Collect doctor feedback from the dermatology pilot group."
    },
    `MediCore Clinics wants practical AI that saves doctor time without weakening clinical control. Data sensitivity is high, so all product discussions should emphasize review-before-save, auditability, and doctor approval.`
  ),
  client(
    "client-apex-legal",
    "Apex Legal Partners",
    {
      company: "Apex Legal Partners",
      industry: "Legal",
      relationshipStage: "Discovery",
      health: "Amber",
      accountOwner: "Priya Nair",
      primaryContact: "Ananya Deshpande, Partner",
      annualValueInr: 2200000,
      renewalDate: "2027-01-31",
      openProjects: ["LegalDoc Summarizer"],
      nextAction: "Get sanitized contract samples and confidentiality approval."
    },
    `Apex Legal Partners is interested but cautious. The buying committee needs confidence that AI output will support lawyers rather than replace partner judgment. Confidentiality and source traceability are the two strongest concerns.`
  ),
  client(
    "client-fintrust",
    "FinTrust Capital",
    {
      company: "FinTrust Capital",
      industry: "Financial Services",
      relationshipStage: "Active Client",
      health: "Green",
      accountOwner: "Sanjay Rao",
      primaryContact: "Vikram Bhatt, CFO",
      annualValueInr: 6200000,
      renewalDate: "2027-03-20",
      openProjects: ["Invoice Intelligence Agent", "Compliance Knowledge Brain"],
      nextAction: "Prepare QA report for invoice extraction and policy citation tests."
    },
    `FinTrust Capital is the highest-value active account. They care about controls, evidence, and operational efficiency. The relationship is strong, but every AI answer must be defensible and tied to source documents.`
  ),
  client(
    "client-learnsphere",
    "LearnSphere EdTech",
    {
      company: "LearnSphere EdTech",
      industry: "Education",
      relationshipStage: "Discovery",
      health: "Amber",
      accountOwner: "Priya Nair",
      primaryContact: "Ritika Shah, Head of Support",
      annualValueInr: 1800000,
      renewalDate: "2027-05-30",
      openProjects: ["Support Autopilot"],
      nextAction: "Complete support taxonomy cleanup plan."
    },
    `LearnSphere has a clear support automation need but messy source data. The opportunity can grow if the first phase improves support deflection without creating low-quality automated responses.`
  ),
  client(
    "client-urbankart",
    "UrbanKart Commerce",
    {
      company: "UrbanKart Commerce",
      industry: "E-commerce",
      relationshipStage: "Pilot",
      health: "Green",
      accountOwner: "Sanjay Rao",
      primaryContact: "Arjun Mehta, VP Sales",
      annualValueInr: 2400000,
      renewalDate: "2027-06-10",
      openProjects: ["Sales Meeting Intelligence"],
      nextAction: "Review pilot adoption with sales managers."
    },
    `UrbanKart is piloting sales intelligence for account teams. The buyer values manager visibility and better follow-up discipline. The main risk is inconsistent sales rep usage.`
  ),
  lead(
    "lead-banyan-health",
    "Banyan Health Systems",
    {
      company: "Banyan Health Systems",
      stage: "Qualified",
      owner: "Priya Nair",
      source: "Founder Referral",
      potentialValueInr: 3200000,
      probability: 48,
      contact: "Rahul Sethi, CTO",
      interest: "Patient support assistant and internal policy search",
      nextAction: "Schedule workflow mapping call with operations head."
    },
    `Banyan Health Systems is exploring AI for patient service workflows. They have budget but need a clear privacy posture and a practical first use case. Strong fit for healthcare SLM patterns from MediCore.`
  ),
  lead(
    "lead-orbit-logistics",
    "Orbit Logistics",
    {
      company: "Orbit Logistics",
      stage: "New",
      owner: "Priya Nair",
      source: "Website",
      potentialValueInr: 1900000,
      probability: 22,
      contact: "Maya Thomas, Head of Ops",
      interest: "Shipment exception summarization",
      nextAction: "Qualify data availability and decision timeline."
    },
    `Orbit Logistics submitted a website inquiry about summarizing shipment exceptions and routing them to operations teams. Needs qualification before proposal work.`
  ),
  lead(
    "lead-saffron-bank",
    "Saffron Bank",
    {
      company: "Saffron Bank",
      stage: "Proposal",
      owner: "Founder",
      source: "Partner",
      potentialValueInr: 5400000,
      probability: 41,
      contact: "Dev Malhotra, Digital Transformation Lead",
      interest: "Compliance and branch knowledge assistant",
      nextAction: "Send source-citation architecture and security summary."
    },
    `Saffron Bank is a high-value regulated opportunity. The proposal should emphasize controlled retrieval, audit logs, data residency options, and human approval for operational changes.`
  ),
  lead(
    "lead-craftlane",
    "CraftLane Market",
    {
      company: "CraftLane Market",
      stage: "Qualified",
      owner: "Priya Nair",
      source: "LinkedIn",
      potentialValueInr: 1400000,
      probability: 35,
      contact: "Ira Khanna, Founder",
      interest: "Seller support automation",
      nextAction: "Share two-phase support automation estimate."
    },
    `CraftLane is an early-stage marketplace with growing seller support volume. Budget is moderate, but the buying cycle may be short if ROI is clear.`
  ),
  lead(
    "lead-vectorfoods",
    "VectorFoods",
    {
      company: "VectorFoods",
      stage: "Negotiation",
      owner: "Founder",
      source: "Outbound",
      potentialValueInr: 2800000,
      probability: 57,
      contact: "Kabir Rao, COO",
      interest: "Demand planning and procurement signals",
      nextAction: "Clarify procurement integration cost."
    },
    `VectorFoods has a serious demand planning need and is comparing ComBrain AI with a traditional analytics vendor. Win path depends on speed, explainability, and lower implementation burden.`
  ),
  lead(
    "lead-eduloop",
    "EduLoop Academy",
    {
      company: "EduLoop Academy",
      stage: "New",
      owner: "Priya Nair",
      source: "Event",
      potentialValueInr: 950000,
      probability: 18,
      contact: "Sneha Jain, Program Director",
      interest: "Student query assistant",
      nextAction: "Qualify number of monthly student queries."
    },
    `EduLoop is a smaller education lead. The opportunity may be best served with a packaged support assistant rather than a heavy custom build.`
  ),
  lead(
    "lead-onyx-realty",
    "Onyx Realty Group",
    {
      company: "Onyx Realty Group",
      stage: "Qualified",
      owner: "Priya Nair",
      source: "Referral",
      potentialValueInr: 1700000,
      probability: 32,
      contact: "Varun Nanda, Sales Director",
      interest: "Lead qualification and project FAQ bot",
      nextAction: "Request sample buyer inquiries and brochure PDFs."
    },
    `Onyx Realty wants faster buyer qualification and property information answers. Good fit for retrieval over brochures, pricing sheets, and sales FAQs.`
  ),
  lead(
    "lead-pulse-insurance",
    "Pulse Insurance",
    {
      company: "Pulse Insurance",
      stage: "Proposal",
      owner: "Founder",
      source: "Founder Network",
      potentialValueInr: 4600000,
      probability: 44,
      contact: "Nitin Bose, Claims Head",
      interest: "Claims triage and document summarization",
      nextAction: "Prepare phased rollout with risk controls."
    },
    `Pulse Insurance has a strong operations pain around claims triage. The proposal should lead with human-in-the-loop review and measurable cycle time reduction.`
  ),
  lead(
    "lead-kitehr",
    "KiteHR",
    {
      company: "KiteHR",
      stage: "Nurture",
      owner: "Priya Nair",
      source: "Content",
      potentialValueInr: 1200000,
      probability: 16,
      contact: "Alok Verma, Product Lead",
      interest: "Embedded HR assistant",
      nextAction: "Send product integration questions next month."
    },
    `KiteHR is interested in an embedded assistant but does not have an urgent purchase timeline. Keep warm with product-led integration material.`
  ),
  lead(
    "lead-riverline",
    "Riverline Manufacturing",
    {
      company: "Riverline Manufacturing",
      stage: "Qualified",
      owner: "Founder",
      source: "Outbound",
      potentialValueInr: 3600000,
      probability: 39,
      contact: "Manasi Kulkarni, Plant Systems Lead",
      interest: "Maintenance knowledge brain",
      nextAction: "Collect maintenance SOPs and downtime categories."
    },
    `Riverline wants plant technicians to ask questions over maintenance SOPs and machine manuals. Needs offline-friendly deployment discussion and clear permissioning.`
  ),
  {
    id: "system-combrain-architecture",
    type: "system",
    title: "ComBrain Architecture Note",
    status: "Draft",
    owner: "Founder Office",
    updatedAt: today,
    tags: ["architecture", "pinecone", "document-store", "write-mode"],
    fields: {
      product: "ComBrain",
      principle: "Documents are the source of truth",
      futureVectorDb: "Pinecone",
      aiWritePolicy: "Proposal, review, approval, audit"
    },
    body: `ComBrain is a document-native company brain. Employees, projects, clients, leads, policies, meetings, and founder notes should all exist as documents with structured metadata.

The UI can present these documents as CRM boards, employee tables, project dashboards, and chat context. The AI layer should retrieve relevant documents, answer with citations, and propose edits when write mode is enabled.

AI writes should not silently mutate company memory. The safe workflow is: identify target documents, draft a change, show a human-readable diff, request founder approval, save the new document version, embed the updated content into Pinecone, and log the event.`
  }
];

export const initialMockSubscriptions: BrainDocument[] = [
  {
    id: "sub-openai",
    type: "subscription",
    title: "OpenAI API",
    status: "Active",
    owner: "Rohan Iyer",
    updatedAt: today,
    tags: ["subscription", "AI Tools", "Active"],
    fields: {
      serviceName: "OpenAI API",
      vendor: "OpenAI Inc.",
      website: "https://openai.com",
      category: "AI Tools",
      description: "LLM API access for GPT-4o, GPT-4, and embeddings for ComBrain product development.",
      billingCycle: "Monthly",
      currency: "USD",
      cost: 850,
      tax: 0,
      totalAmount: 850,
      purchaseDate: "2025-01-15",
      startDate: "2025-01-15",
      renewalDate: "2026-07-28",
      owner: "Rohan Iyer",
      department: "Engineering",
      paymentMethod: "Corporate Visa - 4821",
      billingEmail: "engineering@combrain.com",
      autoRenewal: true,
      status: "Active"
    },
    body: "LLM API access for GPT-4o, GPT-4, and embeddings for ComBrain product development."
  },
  {
    id: "sub-higgsfield",
    type: "subscription",
    title: "Higgsfield AI",
    status: "Due Soon",
    owner: "Priya Nair",
    updatedAt: today,
    tags: ["subscription", "AI Tools", "Due Soon"],
    fields: {
      serviceName: "Higgsfield AI",
      vendor: "Higgsfield Inc.",
      website: "https://higgsfield.ai",
      category: "AI Tools",
      description: "Video generation models license for social marketing and AI research.",
      billingCycle: "Monthly",
      currency: "USD",
      cost: 250,
      tax: 0,
      totalAmount: 250,
      purchaseDate: "2025-03-10",
      startDate: "2025-03-10",
      renewalDate: "2026-07-24",
      owner: "Priya Nair",
      department: "Marketing",
      paymentMethod: "Corporate Visa - 4821",
      billingEmail: "marketing@combrain.com",
      autoRenewal: true,
      status: "Due Soon"
    },
    body: "Video generation models license for social marketing and AI research."
  },
  {
    id: "sub-vercel",
    type: "subscription",
    title: "Vercel Pro",
    status: "Expired",
    owner: "Rohan Iyer",
    updatedAt: today,
    tags: ["subscription", "Cloud Hosting", "Expired"],
    fields: {
      serviceName: "Vercel Pro",
      vendor: "Vercel Inc.",
      website: "https://vercel.com",
      category: "Cloud Hosting",
      description: "Production hosting and serverless functions deployment platform for customer apps.",
      billingCycle: "Monthly",
      currency: "USD",
      cost: 40,
      tax: 0,
      totalAmount: 40,
      purchaseDate: "2024-06-05",
      startDate: "2024-06-05",
      renewalDate: "2026-07-05",
      owner: "Rohan Iyer",
      department: "Engineering",
      paymentMethod: "Corporate Visa - 4821",
      billingEmail: "finance@combrain.com",
      autoRenewal: false,
      status: "Expired"
    },
    body: "Production hosting and serverless functions deployment platform for customer apps."
  },
  {
    id: "sub-google-workspace",
    type: "subscription",
    title: "Google Workspace",
    status: "Renewal Needed",
    owner: "Aisha Menon",
    updatedAt: today,
    tags: ["subscription", "Communication", "Renewal Needed"],
    fields: {
      serviceName: "Google Workspace",
      vendor: "Google LLC",
      website: "https://workspace.google.com",
      category: "Communication",
      description: "Enterprise email, Google Drive cloud storage, and office suite for all active employees.",
      billingCycle: "Monthly",
      currency: "INR",
      cost: 12800,
      tax: 2304,
      totalAmount: 15104,
      purchaseDate: "2023-11-20",
      startDate: "2023-11-20",
      renewalDate: "2026-07-20",
      owner: "Aisha Menon",
      department: "HR & Admin",
      paymentMethod: "Auto Debit - HDFC Bank",
      billingEmail: "hr@combrain.com",
      autoRenewal: true,
      status: "Renewal Needed"
    },
    body: "Enterprise email, Google Drive cloud storage, and office suite for all active employees."
  },
  {
    id: "sub-supabase",
    type: "subscription",
    title: "Supabase Pro",
    status: "Active",
    owner: "Rohan Iyer",
    updatedAt: today,
    tags: ["subscription", "Cloud Hosting", "Active"],
    fields: {
      serviceName: "Supabase Pro",
      vendor: "Supabase Inc.",
      website: "https://supabase.com",
      category: "Cloud Hosting",
      description: "Managed Postgres database, authentication, and object storage buckets for app backends.",
      billingCycle: "Monthly",
      currency: "USD",
      cost: 25,
      tax: 0,
      totalAmount: 25,
      purchaseDate: "2024-08-12",
      startDate: "2024-08-12",
      renewalDate: "2026-08-12",
      owner: "Rohan Iyer",
      department: "Engineering",
      paymentMethod: "Corporate Visa - 4821",
      billingEmail: "engineering@combrain.com",
      autoRenewal: true,
      status: "Active"
    },
    body: "Managed Postgres database, authentication, and object storage buckets for app backends."
  }
];

export const brainDocuments: BrainDocument[] = [
  ...baseBrainDocuments.filter((document) => document.type !== "client" && document.type !== "lead"),
  ...sheetLeadDocuments,
  ...initialMockSubscriptions
];

export const getDocumentsByType = (type: BrainDocument["type"], documents = brainDocuments) =>
  documents.filter((document) => document.type === type);
