export interface Project {
  id: string;
  name: string;
  description: string;
  currentStatus: ProjectStatus;
  departments: string[];
  startedAt: Date;
  endDate: Date;
  priority: ProjectPriority;
  budget: number;
  progress: number;
  projectManager: string;
  objectives: string[];
}

type ProjectStatus = "In Progress" | "Completed" | "Planning" | "On Hold" | "Cancelled";
type ProjectPriority = "Low" | "Medium" | "High" | "Critical";

export const projects: Project[] = [
  {
    id: "PROJ-001",
    name: "Customer Portal Redesign",
    description: "Complete overhaul of the customer-facing portal to improve user experience and modernize the interface",
    currentStatus: "In Progress",
    departments: ["DEPT-001", "DEPT-006"], // Engineering, Product
    startedAt: new Date("2024-01-15"),
    endDate: new Date("2024-04-30"),
    priority: "High",
    budget: 150000,
    progress: 65,
    projectManager: "EMP-230984", // Penelope Rivera (Head of Product)
    objectives: [
      "Reduce customer support tickets by 30%",
      "Improve user satisfaction scores",
      "Implement responsive design",
      "Add self-service features"
    ]
  },
  {
    id: "PROJ-002",
    name: "Data Analytics Platform",
    description: "Build an internal analytics platform to provide real-time insights into business metrics and customer behavior",
    currentStatus: "Planning",
    departments: ["DEPT-001", "DEPT-008"], // Engineering, Operations
    startedAt: new Date("2024-02-01"),
    endDate: new Date("2024-07-15"),
    priority: "Medium",
    budget: 250000,
    progress: 25,
    projectManager: "EMP-430982", // Elijah Walker (Head of Engineering)
    objectives: [
      "Centralize data from multiple sources",
      "Create real-time dashboards",
      "Enable self-service analytics",
      "Improve data quality and governance"
    ]
  },
  {
    id: "PROJ-003",
    name: "Mobile App Security Audit",
    description: "Comprehensive security assessment and implementation of enhanced security measures for the mobile application",
    currentStatus: "Completed",
    departments: ["DEPT-001"], // Engineering
    startedAt: new Date("2023-11-01"),
    endDate: new Date("2024-01-31"),
    priority: "Critical",
    budget: 75000,
    progress: 100,
    projectManager: "EMP-540982", // Sebastian Nelson (QA Engineer)
    objectives: [
      "Identify and fix security vulnerabilities",
      "Implement multi-factor authentication",
      "Add encryption for sensitive data",
      "Achieve compliance with security standards"
    ]
  },
  {
    id: "PROJ-004",
    name: "Sales CRM Integration",
    description: "Integrate existing CRM system with new sales automation tools to streamline lead management and customer tracking",
    currentStatus: "In Progress",
    departments: ["DEPT-005", "DEPT-001", "DEPT-008"], // Sales, Engineering, Operations
    startedAt: new Date("2024-02-20"),
    endDate: new Date("2024-06-15"),
    priority: "High",
    budget: 120000,
    progress: 45,
    projectManager: "EMP-781204", // Logan Perez (Head of Sales)
    objectives: [
      "Automate lead scoring and routing",
      "Improve sales team productivity by 25%",
      "Integrate with existing marketing tools",
      "Implement advanced reporting features"
    ]
  },
  {
    id: "PROJ-005",
    name: "Employee Onboarding System",
    description: "Develop a comprehensive digital onboarding platform to streamline new hire processes and improve employee experience",
    currentStatus: "In Progress",
    departments: ["DEPT-004", "DEPT-001", "DEPT-006"], // HR, Engineering, Product
    startedAt: new Date("2024-03-01"),
    endDate: new Date("2024-05-30"),
    priority: "Medium",
    budget: 90000,
    progress: 30,
    projectManager: "EMP-598210", // Evelyn Hall (Head of Human Resources)
    objectives: [
      "Reduce onboarding time from 2 weeks to 5 days",
      "Create digital document management system",
      "Implement automated task tracking",
      "Improve new hire satisfaction scores"
    ]
  }
];
