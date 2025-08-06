import styles from "./Tasks.module.css";
import { generateHash, formatCurrency } from "../../utils/helpers";
import { Table } from "../../components/ui/Table/Table";
import { Task, tasks } from "../../data/tasks";
import { getEmployeeById } from "../../data/employees";
import { getProjectById, projects } from "../../data/projects";
import { ProgressBar } from "../../components/ui/ProgressBar/ProgressBar";

const colors: [string, string] = ["#3498db", "#8e44ad"];

export class TasksScreen {
  private hash: string = "";

  private departmentsTable: Table<Task> = new Table<Task>();

  private tableProps = {
    headers: ["Task ID", "Task Name", "Project", "Current Status", "Priority", "Progress", "Employees"],
    rows: tasks,
    renderRow: (row: Task) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.id}</td>
          <td>${row.name}</td>
          <td>${getProjectById(row.projectId)?.name}</td>
          <td><span class="${styles.statusTag} ${styles[row.currentStatus.toLowerCase().replace(" ", "-")]}">${row.currentStatus}</span></td>
          <td><span class="${styles.PriorityBadge} ${styles[row.priority.toLowerCase()]}">${row.priority}</span></td>
          <td>
            <div class="${styles.progressBarContainer}">
              <div class="${styles.progressBar}" data-progress="${row.progress}"></div>
              <span class="${styles.progressBarLabel}">${row.progress}%</span>
            </div>
          </td>
          <td>${row.employees.map(employeeId => getEmployeeById(employeeId)?.name).join(", ")}</td>
      `;

      const progressBar = new ProgressBar();
      progressBar.render(tr.querySelector(`[data-progress]`) as HTMLElement, { progress: row.progress, colors: colors });

      return tr.outerHTML;
    },
    search: {
      placeholder: "Search Tasks...",
      searchHandler: (value: string, allRows: Task[]) => {
        return allRows.filter((row) => {
          return row.id.toString().includes(value) || 
                  row.name.toLowerCase().includes(value.toLowerCase()) ||
                  getProjectById(row.projectId)?.name.toLowerCase().includes(value.toLowerCase()) ||
                  row.employees.map(employeeId => getEmployeeById(employeeId)?.name.toLowerCase()).join(", ").includes(value.toLowerCase())
        });
      }
    },
    sorting: {
      options: [
        { label: "Task ID", value: "id"  },
        { label: "Task Name", value: "name" },
        { label: "Project", value: "projectName"},
        { label: "Current Status", value: "currentStatus", default: true},
        { label: "Priority", value: "priority"},
        { label: "Progress", value: "progress"},
      ],
      sortHandler: (option: string, allRows: Task[]) => {
        return allRows.sort((a, b) => {
          if (option === "id") {
            return a.id.localeCompare(b.id);
          } else if (option === "name") {
            return a.name.localeCompare(b.name);
          } else if (option === "projectName") {
            return getProjectById(a.projectId)?.name.localeCompare(getProjectById(b.projectId)?.name || "") ?? 0;
          } else if (option === "currentStatus") {
            const statusOrder = {
              "In Progress": 1,
              "On Hold": 2,
              "Completed": 3,
            };
            return statusOrder[a.currentStatus] - statusOrder[b.currentStatus];
          } else if (option === "priority") {
            const priorityOrder = { 
              "Low": 1,
              "Medium": 2,
              "High": 3,
              "Critical": 4
            };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          } else if (option === "progress") {
            return b.progress - a.progress;
          } else {
            throw new Error(`Invalid sort option: ${option}`);
          }
        });
      }
    },
    filtering: {
      filters: {
        projectId: {
          options: [
            {
              label: "All Projects",
              value: "all",
              default: true,
            },
            ...projects.map(project => ({
              label: project.name,
              value: project.id,
            })),
          ],
          icon: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
        },
        currentStatus: {
          options: [
            {
              label: "All Statuses",
              value: "all",
              default: true,
            },
            {
              label: "In Progress",
              value: "In Progress",
            },
            {
              label: "Completed",
              value: "Completed",
            },
            {
              label: "On Hold",
              value: "On Hold",
            }
          ],
          icon: `<svg width="18px" height="18px" viewBox="-2.4 -2.4 52.80 52.80" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" stroke-width="3.6"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><defs><style>.a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="a" d="M3.6062,17.174A21.5158,21.5158,0,1,1,2.5,24H15.1606l5.0768,11.3551,7.0248-23.1028L31.0093,24h5.944"></path><circle class="a" cx="38.9439" cy="24" r="1.9907"></circle></g></svg>`
        },
        priority: {
          options: [
            {
              label: "All Priorities",
              value: "all",
              default: true,
            },
            {
              label: "Low",
              value: "Low",
            },
            {
              label: "Medium",
              value: "Medium",
            },
            {
              label: "High",
              value: "High",
            },
            {
              label: "Critical",
              value: "Critical",
            },
          ],
          icon: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
        },
      },
      filterHandler: (filter: string, value: string, allRows: Task[]) => {
        if (value === "all") {
          return allRows;
        }
        return allRows.filter((row) => row[filter as keyof Task] === value);
      }
    }
  }

  constructor() {
    this.hash = generateHash();
  }

  render(container: HTMLElement): void {
    const tasks = document.createElement("div");
    tasks.className = styles.tasks;
    tasks.innerHTML = `
      <div id="${this.hash}-tasks-table-container"></div>
    `;

    this.departmentsTable.render(tasks.querySelector(`#${this.hash}-tasks-table-container`) as HTMLElement, this.tableProps);

    container.appendChild(tasks);
  }
}
