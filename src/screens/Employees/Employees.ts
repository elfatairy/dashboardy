import styles from "./Employees.module.css";
import { generateHash, formatCurrency } from "../../utils/helpers";
import { Table } from "../../components/ui/Table/Table";
import { Employee, employees } from "../../data/employees";
import { Department, departments, getDepartmentById } from "../../data/departments";
import { EmployeesDepartmentsGraph } from "../../components/Employees/EmployessDepartmentsGraph/EmployessDepartmentsGraph";
import { EmployessEmploymentTypeGraph } from "../../components/Employees/EmployessEmploymentTypeGraph/EmployessEmploymentTypeGraph";

const employmentTypes = [
  { label: "All Employment Types", value: "all", default: true },
  { label: "Full Time", value: "full-time" },
  { label: "Part Time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Intern", value: "intern" },
];


export class EmployeesScreen {
  private hash: string = "";
  
  private employeesTable: Table<Employee> = new Table<Employee>();
  private employeesDepartmentsGraph: EmployeesDepartmentsGraph = new EmployeesDepartmentsGraph();
  private employeesEmploymentTypesGraph: EmployessEmploymentTypeGraph = new EmployessEmploymentTypeGraph();

  constructor() {
    this.hash = generateHash();
  }

  render(container: HTMLElement): void {
    const tableProps = {
      headers: ["Employee ID", "Phone", "Name", "Working Since", "Current Salary", "Department", "Role", "Employment Type"],
      rows: employees,
      renderRow: (row: Employee) => {
        return `
          <tr>
            <td>${row.id}</td>
            <td>${row.phone}</td>
            <td>${row.name}</td>
            <td>${new Date(row.workingSince).toLocaleDateString()}</td>
            <td>${formatCurrency(row.currentSalary)}</td>
            <td>${getDepartmentById(row.departmentId)?.name}</td>
            <td>${row.role}</td>
            <td>
              <span class="${styles.employmentType} ${styles[row.employmentType]}">
                ${employmentTypes.find((type) => type.value === row.employmentType)?.label}
              </span>
            </td>
          </tr>
        `;
      },
      search: {
        initialSearch: new URLSearchParams(window.location.search).get("search"),
        placeholder: "Search Employees...",
        searchHandler: (value: string, allRows: Employee[]) => {
          return allRows.filter((row) => {
            return row.id.toString().includes(value) || 
                    row.name.toLowerCase().includes(value.toLowerCase()) ||
                    row.phone.toString().includes(value) ||
                    row.currentSalary.toString().includes(value) ||
                    getDepartmentById(row.departmentId)?.name.toLowerCase().includes(value.toLowerCase()) ||
                    row.role.toLowerCase().includes(value.toLowerCase()) ||
                    row.employmentType.toLowerCase().includes(value.toLowerCase());
          });
        }
      },
      sorting: {
        options: [
          { label: "Employee ID", value: "employeeId", default: true  },
          { label: "Name", value: "name" },
          { label: "Current Salary", value: "currentSalary"},
          { label: "Working Since", value: "workingSince"},
        ],
        sortHandler: (option: string, allRows: Employee[]) => {
          return allRows.sort((a, b) => {
            if (option === "employeeId") {
              return a.id.localeCompare(b.id);
            } else if (option === "name") {
              return a.name.localeCompare(b.name);
            } else if (option === "currentSalary") {
              return b.currentSalary - a.currentSalary;
            } else if (option === "workingSince") {
              return new Date(b.workingSince).getTime() - new Date(a.workingSince).getTime();
            } else {
              throw new Error(`Invalid sort option: ${option}`);
            }
          });
        }
      },
      filtering: {
        filters: {
          departmentId: {
            options: [{
              label: "All Departments",
              value: "all",
              default: true,
            }, ...departments.map((department: Department) => ({ label: department.name, value: department.id }))],
            icon: `<svg width="1.125rem" height="1.125rem" viewBox="-2.4 -2.4 52.80 52.80" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" stroke-width="3.6"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="a" d="M3.6062,17.174A21.5158,21.5158,0,1,1,2.5,24H15.1606l5.0768,11.3551,7.0248-23.1028L31.0093,24h5.944"></path><circle class="a" cx="38.9439" cy="24" r="1.9907"></circle></g></svg>`
          },
          employmentType: {
            options: employmentTypes,
            icon: `<svg width="1.125rem" height="1.125rem" viewBox="-2.4 -2.4 52.80 52.80" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" stroke-width="3.6"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="a" d="M3.6062,17.174A21.5158,21.5158,0,1,1,2.5,24H15.1606l5.0768,11.3551,7.0248-23.1028L31.0093,24h5.944"></path><circle class="a" cx="38.9439" cy="24" r="1.9907"></circle></g></svg>`
          },
        },
        filterHandler: (filter: string, value: string, allRows: Employee[]) => {
          if (value === "all") {
            return allRows;
          }
          return allRows.filter((row) => row[filter as keyof Employee] === value);
        }
      }
    }

    const employeesContainer = document.createElement("div");
    employeesContainer.className = styles.employees;
    employeesContainer.innerHTML = `
      <div class="${styles.employeesGraphs}">
        <div class="${styles.employeesDepartmentsGraphs}" id="${this.hash}-employees-departments-graph"></div>
        <div class="${styles.employeesEmploymentTypesGraphs}" id="${this.hash}-employees-employment-types-graph"></div>
      </div>

      <div id="${this.hash}-employees-table-container"></div>
    `;

    this.employeesTable.render(employeesContainer.querySelector(`#${this.hash}-employees-table-container`) as HTMLElement, tableProps);
    this.employeesDepartmentsGraph.render(employeesContainer.querySelector(`#${this.hash}-employees-departments-graph`) as HTMLElement);
    this.employeesEmploymentTypesGraph.render(employeesContainer.querySelector(`#${this.hash}-employees-employment-types-graph`) as HTMLElement);

    container.appendChild(employeesContainer);
  }
}
