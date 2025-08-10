import styles from "./Departments.module.css";
import { generateHash, formatCurrency } from "../../utils/helpers";
import { Table } from "../../components/ui/Table/Table";
import { getEmployeeById } from "../../data/employees";
import { Department, departments } from "../../data/departments";

export class DepartmentsScreen {
  private hash: string = "";

  private departmentsTable: Table<Department> = new Table<Department>();

  constructor() {
    this.hash = generateHash();
  }

  render(container: HTMLElement): void {
    const tableProps = {
      headers: ["Department ID", "Name", "Code", "Manager", "Annual Budget", "Current Spendings", "Status", "Established Date"],
      rows: departments,
      renderRow: (row: Department) => {
        return `
          <tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.code}</td>
            <td>${getEmployeeById(row.managerId)?.name}</td>
            <td>${formatCurrency(row.annualBudget)}</td>
            <td>${formatCurrency(row.currentSpend)}</td>
            <td>
              <span class="${styles.statusTag} ${styles[row.status]}">${row.status}</span>
            </td>
            <td>${new Date(row.establishedDate).toLocaleDateString()}</td>
          </tr>
        `;
      },
      search: {
        initialSearch: new URLSearchParams(window.location.search).get("search"),
        placeholder: "Search Departments...",
        searchHandler: (value: string, allRows: Department[]) => {
          return allRows.filter((row) => {
            return row.id.toString().includes(value) || 
                    row.name.toLowerCase().includes(value.toLowerCase()) ||
                    row.code.toLowerCase().includes(value.toLowerCase()) ||
                    getEmployeeById(row.managerId)?.name.toLowerCase().includes(value.toLowerCase()) ||
                    row.annualBudget.toString().includes(value) ||
                    row.currentSpend.toString().includes(value)
          });
        }
      },
      sorting: {
        options: [
          { label: "Department ID", value: "id", default: true  },
          { label: "Name", value: "name" },
          { label: "Annual Budget", value: "annualBudget"},
          { label: "Current Spendings", value: "currentSpend"},
          { label: "Established Date", value: "establishedDate"},
        ],
        sortHandler: (option: string, allRows: Department[]) => {
          return allRows.sort((a, b) => {
            if (option === "id") {
              return a.id.localeCompare(b.id);
            } else if (option === "name") {
              return a.name.localeCompare(b.name);
            } else if (option === "annualBudget") {
              return b.annualBudget - a.annualBudget;
            } else if (option === "currentSpend") {
              return b.currentSpend - a.currentSpend;
            } else if (option === "establishedDate") {
              return new Date(b.establishedDate).getTime() - new Date(a.establishedDate).getTime();
            } else {
              throw new Error(`Invalid sort option: ${option}`);
            }
          });
        }
      },
      filtering: {
        filters: {
          status: {
            options: [
              {
                label: "All Statuses",
                value: "all",
                default: true,
              }, 
              {
                label: "Active",
                value: "active",
              },
              {
                label: "Restructuring",
                value: "restructuring",
              },
              {
                label: "Closed",
                value: "closed",
              },
            ],
            icon: `<svg width="1.125rem" height="1.125rem" viewBox="-2.4 -2.4 52.80 52.80" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" stroke-width="3.6"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="a" d="M3.6062,17.174A21.5158,21.5158,0,1,1,2.5,24H15.1606l5.0768,11.3551,7.0248-23.1028L31.0093,24h5.944"></path><circle class="a" cx="38.9439" cy="24" r="1.9907"></circle></g></svg>`
          },
        },
        filterHandler: (filter: string, value: string, allRows: Department[]) => {
          if (value === "all") {
            return allRows;
          }
          return allRows.filter((row) => row[filter as keyof Department] === value);
        }
      }
    }

    const departmentsContainer = document.createElement("div");
    departmentsContainer.className = styles.departments;
    departmentsContainer.innerHTML = `
      <div id="${this.hash}-departments-table-container"></div>
    `;

    this.departmentsTable.render(departmentsContainer.querySelector(`#${this.hash}-departments-table-container`) as HTMLElement, tableProps);

    container.appendChild(departmentsContainer);
  }
}
