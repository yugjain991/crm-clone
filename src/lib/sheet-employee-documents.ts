import type { BrainDocument } from "./types";

const today = "2026-06-17";

type SheetEmployee = {
  serialNo: number;
  name: string;
  phone?: string;
  dateOfLeaving: string;
  currentSalary: string;
  updatedStipend: string;
  dateOfJoining: string;
  oldStipend: string;
  offerLetter: string;
  panCard: string;
  aadhaarCard: string;
  bankDetails: string;
  paidFebStipend: string;
  paidMarch7: string;
  paidFeb3: string;
  paidMay7: string;
  paidJun5: string;
};

const employees: SheetEmployee[] = [
  {
    serialNo: 1,
    name: "Arjun Mehta",
    phone: "+91 98100 11001",
    dateOfLeaving: "Still Active",
    currentSalary: "25000",
    updatedStipend: "25k",
    dateOfJoining: "01/08/2025",
    oldStipend: "15k",
    offerLetter: "Arjun - ComBrain AI Internship Offer letter.pdf",
    panCard: "Arjun Pan.pdf",
    aadhaarCard: "Arjun Aadhar.pdf",
    bankDetails: "Arjun Cheque",
    paidFebStipend: "Yes",
    paidMarch7: "25000",
    paidFeb3: "15000",
    paidMay7: "25000",
    paidJun5: "25000"
  },
  {
    serialNo: 2,
    name: "Priya Sharma",
    phone: "+91 98100 11002",
    dateOfLeaving: "15/03/2026",
    currentSalary: "",
    updatedStipend: "-",
    dateOfJoining: "10/09/2025",
    oldStipend: "15k",
    offerLetter: "Priya - ComBrain AI Internship Offer letter.pdf",
    panCard: "Priya Pan.pdf",
    aadhaarCard: "Priya Aadhar.pdf",
    bankDetails: "Priya Cheque",
    paidFebStipend: "Yes",
    paidMarch7: "12500",
    paidFeb3: "15000",
    paidMay7: "",
    paidJun5: ""
  },
  {
    serialNo: 3,
    name: "Rohan Verma",
    phone: "+91 98100 11003",
    dateOfLeaving: "Still Active",
    currentSalary: "20000",
    updatedStipend: "20k",
    dateOfJoining: "15/09/2025",
    oldStipend: "12k",
    offerLetter: "Rohan - ComBrain AI Internship Offer letter.pdf",
    panCard: "Rohan Pan.pdf",
    aadhaarCard: "Rohan Aadhar.pdf",
    bankDetails: "Rohan Cheque",
    paidFebStipend: "Yes",
    paidMarch7: "20000",
    paidFeb3: "12000",
    paidMay7: "20000",
    paidJun5: "20000"
  },
  {
    serialNo: 4,
    name: "Kavya Nair",
    phone: "+91 98100 11004",
    dateOfLeaving: "20/04/2026",
    currentSalary: "",
    updatedStipend: "15k",
    dateOfJoining: "01/10/2025",
    oldStipend: "15k",
    offerLetter: "Kavya - ComBrain AI Internship Offer letter.pdf",
    panCard: "Kavya Pan.pdf",
    aadhaarCard: "Kavya Aadhar.pdf",
    bankDetails: "Kavya Cheque",
    paidFebStipend: "Yes",
    paidMarch7: "15000",
    paidFeb3: "15000",
    paidMay7: "7500",
    paidJun5: ""
  },
  {
    serialNo: 5,
    name: "Nikhil Joshi",
    phone: "+91 98100 11005",
    dateOfLeaving: "Still Active",
    currentSalary: "18000",
    updatedStipend: "18k",
    dateOfJoining: "05/11/2025",
    oldStipend: "12k",
    offerLetter: "Nikhil - ComBrain AI Internship Offer letter.pdf",
    panCard: "Nikhil Pan.pdf",
    aadhaarCard: "Nikhil Aadhar.pdf",
    bankDetails: "Nikhil Cheque",
    paidFebStipend: "Yes",
    paidMarch7: "18000",
    paidFeb3: "12000",
    paidMay7: "18000",
    paidJun5: "18000"
  },
  {
    serialNo: 6,
    name: "Sneha Patel",
    phone: "+91 98100 11006",
    dateOfLeaving: "10/02/2026",
    currentSalary: "",
    updatedStipend: "-",
    dateOfJoining: "12/10/2025",
    oldStipend: "10k",
    offerLetter: "Sneha - ComBrain AI Internship Offer letter.pdf",
    panCard: "Sneha Pan.pdf",
    aadhaarCard: "Sneha Aadhar.pdf",
    bankDetails: "Sneha Cheque",
    paidFebStipend: "",
    paidMarch7: "",
    paidFeb3: "10000",
    paidMay7: "",
    paidJun5: ""
  },
  {
    serialNo: 7,
    name: "Aditya Rao",
    phone: "+91 98100 11007",
    dateOfLeaving: "Still Active",
    currentSalary: "22000",
    updatedStipend: "22k",
    dateOfJoining: "20/11/2025",
    oldStipend: "15k",
    offerLetter: "Aditya - ComBrain AI Internship Offer letter.pdf",
    panCard: "Aditya Pan.pdf",
    aadhaarCard: "Aditya Aadhar.pdf",
    bankDetails: "Aditya Cheque",
    paidFebStipend: "Yes",
    paidMarch7: "22000",
    paidFeb3: "15000",
    paidMay7: "22000",
    paidJun5: "22000"
  },
  {
    serialNo: 8,
    name: "Divya Kapoor",
    phone: "+91 98100 11008",
    dateOfLeaving: "Still Active",
    currentSalary: "16000",
    updatedStipend: "16k",
    dateOfJoining: "01/12/2025",
    oldStipend: "10k",
    offerLetter: "Divya - ComBrain AI Internship Offer letter.pdf",
    panCard: "Divya Pan.pdf",
    aadhaarCard: "Divya Aadhar.pdf",
    bankDetails: "Divya Cheque",
    paidFebStipend: "Yes",
    paidMarch7: "16000",
    paidFeb3: "10000",
    paidMay7: "16000",
    paidJun5: "16000"
  },
  {
    serialNo: 9,
    name: "Karan Singh",
    phone: "+91 98100 11009",
    dateOfLeaving: "30/01/2026",
    currentSalary: "",
    updatedStipend: "-",
    dateOfJoining: "15/10/2025",
    oldStipend: "12k",
    offerLetter: "Karan - ComBrain AI Internship Offer letter.pdf",
    panCard: "Karan Pan.pdf",
    aadhaarCard: "Karan Aadhar.pdf",
    bankDetails: "Karan Cheque",
    paidFebStipend: "",
    paidMarch7: "",
    paidFeb3: "12000",
    paidMay7: "",
    paidJun5: ""
  },
  {
    serialNo: 10,
    name: "Meera Iyer",
    phone: "+91 98100 11010",
    dateOfLeaving: "Still Active",
    currentSalary: "30000",
    updatedStipend: "30k",
    dateOfJoining: "01/09/2025",
    oldStipend: "20k",
    offerLetter: "Meera - ComBrain AI Internship Offer letter.pdf",
    panCard: "Meera Pan.pdf",
    aadhaarCard: "Meera Aadhar.pdf",
    bankDetails: "Meera Cheque",
    paidFebStipend: "Yes",
    paidMarch7: "30000",
    paidFeb3: "20000",
    paidMay7: "30000",
    paidJun5: "30000"
  },
];

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const normalizeStatus = (dateOfLeaving: string): "Active" | "Exited" =>
  dateOfLeaving === "Still Active" ? "Active" : "Exited";

export const sheetEmployeeDocuments: BrainDocument[] = employees.map((emp) => {
  const status = normalizeStatus(emp.dateOfLeaving);
  const docId = `emp-sheet-${slugify(emp.name)}`;
  const paymentSummary = [
    emp.paidFebStipend ? `- Paid Feb stipend: ${emp.paidFebStipend}` : "",
    emp.paidMarch7 ? `- Paid March 7: ${emp.paidMarch7}` : "",
    emp.paidFeb3 ? `- Paid Feb 3: ${emp.paidFeb3}` : "",
    emp.paidMay7 ? `- Paid May 7: ${emp.paidMay7}` : "",
    emp.paidJun5 ? `- Paid Jun 5/6: ${emp.paidJun5}` : "",
  ].filter(Boolean).join("\n");

  return {
    id: docId,
    type: "employee",
    title: `${emp.name} - ComBrain AI Team`,
    status,
    owner: "Founder Office",
    updatedAt: today,
    tags: ["employee", "ComBrain AI", status],
    fields: {
      name: emp.name,
      role: "Team Member",
      department: "ComBrain AI",
      monthlySalaryInr: emp.currentSalary ? parseInt(emp.currentSalary.replace(/\D/g, "")) || 0 : 0,
      dateOfJoining: emp.dateOfJoining,
      status,
      phone: emp.phone || "",
      location: "India",
      reportingTo: "Founder",
      offerLetter: emp.offerLetter,
      panCard: emp.panCard,
      aadhaarCard: emp.aadhaarCard,
      bankDetails: emp.bankDetails,
    },
    body: `Imported employee record from the ComBrain AI team roster.\n\nName: ${emp.name}\nStatus: ${status}\nDate of joining: ${emp.dateOfJoining}\nDate of leaving: ${emp.dateOfLeaving}\nCurrent salary: ${emp.currentSalary || "Not provided"}\nUpdated stipend: ${emp.updatedStipend}\nOld stipend: ${emp.oldStipend}\n\nDocument references:\n- Offer letter: ${emp.offerLetter}\n- PAN card: ${emp.panCard}\n- Aadhaar card: ${emp.aadhaarCard}\n- Bank details: ${emp.bankDetails || "Captured from sheet - protected field"}\n\nPayment records:\n${paymentSummary || "- No payment records"}`,
  };
});
