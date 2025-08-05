export interface Department {
  id: string;
  name: string;
  description: string;
  code: string;
  managerId: string;
  location: string;
  annualBudget: number;
  currentSpend: number;
  status: "active" | "inactive" | "restructuring";
  establishedDate: string;
}

export const getDepartmentById = (id: string) => {
  return departments.find((department) => department.id === id);
};

export const departments: Department[] = [
  {
    id: "DEPT-001",
    name: "Engineering",
    description: "Software development and technical infrastructure",
    code: "ENG",
    managerId: "EMP-430982", // Elijah Walker
    location: "San Francisco",
    annualBudget: 2500000,
    currentSpend: 1875000,
    status: "active",
    establishedDate: "2015-01-15"
  },
  {
    id: "DEPT-002",
    name: "Marketing",
    description: "Brand promotion and customer acquisition",
    code: "MKT",
    managerId: "EMP-158209", // Scarlett Green
    location: "New York",
    annualBudget: 1200000,
    currentSpend: 890000,
    status: "active",
    establishedDate: "2015-03-20"
  },
  {
    id: "DEPT-003",
    name: "Finance",
    description: "Financial planning and accounting operations",
    code: "FIN",
    managerId: "EMP-320984", // William Adams
    location: "Chicago",
    annualBudget: 800000,
    currentSpend: 620000,
    status: "active",
    establishedDate: "2015-01-10"
  },
  {
    id: "DEPT-004",
    name: "Human Resources",
    description: "Employee relations and talent management",
    code: "HR",
    managerId: "EMP-598210", // Evelyn Hall
    location: "Austin",
    annualBudget: 600000,
    currentSpend: 475000,
    status: "active",
    establishedDate: "2016-05-12"
  },
  {
    id: "DEPT-005",
    name: "Sales",
    description: "Revenue generation and client relationships",
    code: "SLS",
    managerId: "EMP-781204", // Logan Perez
    location: "Los Angeles",
    annualBudget: 1500000,
    currentSpend: 1125000,
    status: "active",
    establishedDate: "2015-02-28"
  },
  {
    id: "DEPT-006",
    name: "Product",
    description: "Product strategy and development oversight",
    code: "PRD",
    managerId: "EMP-230984", // Penelope Rivera
    location: "Seattle",
    annualBudget: 1000000,
    currentSpend: 750000,
    status: "active",
    establishedDate: "2017-09-15"
  },
  {
    id: "DEPT-007",
    name: "Customer Support",
    description: "Customer service and technical support",
    code: "CS",
    managerId: "EMP-892013", // Daniel Roberts
    location: "Remote",
    annualBudget: 450000,
    currentSpend: 340000,
    status: "active",
    establishedDate: "2018-06-01"
  },
  {
    id: "DEPT-008",
    name: "Operations",
    description: "Business operations and process optimization",
    code: "OPS",
    managerId: "EMP-573920", // Lucas Brown
    location: "Denver",
    annualBudget: 700000,
    currentSpend: 525000,
    status: "restructuring",
    establishedDate: "2016-11-20"
  }
];
