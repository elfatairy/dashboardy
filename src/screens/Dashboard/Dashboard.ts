import { ProgressBar } from "../../components/ui/ProgressBar/ProgressBar";
import { StackedProgressBar } from "../../components/ui/StackedProgressBar/StackedProgressBar";
import { Table } from "../../components/ui/Table/Table";
import { departments } from "../../data/departments";
import { employees, getEmployeeById } from "../../data/employees";
import { Payroll, payrolls } from "../../data/payrolls";
import { Project, projects } from "../../data/projects";
import { tasks } from "../../data/tasks";
import { progressBarColors } from "../../utils/constants";
import { formatCurrency, generateHash } from "../../utils/helpers";
import styles from "./Dashboard.module.css";

const statusIcons = {
  processed: `<svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 4"></path> </g></svg>`,
  pending: `<svg width="14px" height="14px" fill="currentColor" viewBox="0 0 25 24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.336"><g  stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g ><path d="M24,12A12,12,0,0,1,0,12a1,1,0,0,1,2,0A10,10,0,1,0,12,2a1,1,0,0,1,0-2A12.013,12.013,0,0,1,24,12ZM10.277,11H8a1,1,0,0,0,0,2h2.277A1.994,1.994,0,1,0,13,10.277V7a1,1,0,0,0-2,0v3.277A2,2,0,0,0,10.277,11ZM1.827,8.784a1,1,0,1,0-1-1A1,1,0,0,0,1.827,8.784ZM4.221,5.207a1,1,0,1,0-1-1A1,1,0,0,0,4.221,5.207ZM7.779,2.841a1,1,0,1,0-1-1A1,1,0,0,0,7.779,2.841Z"></path></g></svg>`,
  failed: `<svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.43200000000000005"><g  stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"></g><g > <path d="M12 22.75C9.87386 22.75 7.79545 22.1195 6.02762 20.9383C4.2598 19.7571 2.88194 18.0781 2.0683 16.1138C1.25466 14.1495 1.04177 11.9881 1.45656 9.90278C1.87135 7.81748 2.89519 5.90201 4.39861 4.3986C5.90202 2.89518 7.81749 1.87135 9.90278 1.45656C11.9881 1.04176 14.1495 1.25465 16.1139 2.06829C18.0782 2.88193 19.7571 4.25979 20.9383 6.02762C22.1195 7.79545 22.75 9.87385 22.75 12C22.7474 14.8503 21.6139 17.583 19.5985 19.5985C17.583 21.6139 14.8503 22.7474 12 22.75ZM12 2.75C10.1705 2.75 8.38213 3.2925 6.86098 4.3089C5.33983 5.32531 4.15423 6.76996 3.45412 8.46018C2.75401 10.1504 2.57083 12.0103 2.92774 13.8046C3.28465 15.5989 4.16563 17.2471 5.45927 18.5407C6.7529 19.8344 8.40109 20.7153 10.1954 21.0723C11.9897 21.4292 13.8496 21.246 15.5398 20.5459C17.23 19.8458 18.6747 18.6602 19.6911 17.139C20.7075 15.6179 21.25 13.8295 21.25 12C21.2474 9.54756 20.272 7.19632 18.5378 5.46218C16.8037 3.72804 14.4524 2.75264 12 2.75Z" fill="currentColor"></path> <path d="M9.17 15.58C9.07146 15.5805 8.97382 15.5612 8.88281 15.5235C8.7918 15.4857 8.70925 15.4301 8.64 15.36C8.49955 15.2194 8.42066 15.0287 8.42066 14.83C8.42066 14.6312 8.49955 14.4406 8.64 14.3L14.3 8.64C14.4422 8.50752 14.6302 8.43539 14.8245 8.43882C15.0188 8.44225 15.2042 8.52096 15.3416 8.65838C15.479 8.79579 15.5577 8.98117 15.5612 9.17547C15.5646 9.36978 15.4925 9.55782 15.36 9.7L9.7 15.36C9.6311 15.4306 9.54862 15.4864 9.45753 15.5243C9.36643 15.5621 9.26862 15.581 9.17 15.58Z" fill="currentColor"></path> <path d="M14.83 15.58C14.7314 15.581 14.6336 15.5621 14.5425 15.5243C14.4514 15.4864 14.3689 15.4306 14.3 15.36L8.64001 9.7C8.50753 9.55782 8.4354 9.36978 8.43883 9.17547C8.44226 8.98117 8.52097 8.79579 8.65838 8.65838C8.7958 8.52096 8.98118 8.44225 9.17548 8.43882C9.36978 8.43539 9.55783 8.50752 9.70001 8.64L15.36 14.3C15.5005 14.4406 15.5793 14.6312 15.5793 14.83C15.5793 15.0287 15.5005 15.2194 15.36 15.36C15.2908 15.4301 15.2082 15.4857 15.1172 15.5235C15.0262 15.5612 14.9285 15.5805 14.83 15.58Z" fill="currentColor"></path> </g></svg>`,
  received: `<svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2.016"><g  stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M9 10L12.2581 12.4436C12.6766 12.7574 13.2662 12.6957 13.6107 12.3021L20 5" stroke="currentColor" stroke-linecap="round"></path> <path d="M21 12C21 13.8805 20.411 15.7137 19.3156 17.2423C18.2203 18.7709 16.6736 19.9179 14.893 20.5224C13.1123 21.1268 11.187 21.1583 9.38744 20.6125C7.58792 20.0666 6.00459 18.9707 4.85982 17.4789C3.71505 15.987 3.06635 14.174 3.00482 12.2945C2.94329 10.415 3.47203 8.56344 4.51677 6.99987C5.56152 5.4363 7.06979 4.23925 8.82975 3.57685C10.5897 2.91444 12.513 2.81996 14.3294 3.30667" stroke="currentColor" stroke-linecap="round"></path> </g></svg>`,
}

const employeesProgressBarColors = {
  "full-time": "#6e11b0",
  "part-time": "#9810fa",
  "contract": "#c27aff",
  "intern": "#e9d4ff",
}
const employeesSort = {
  "full-time": 0,
  "part-time": 1,
  "contract": 2,
  "intern": 3,
}

const tasksProgressBarColors = {
  "Low": "#ffe4e6",
  "Medium": "#ffa1ad",
  "Critical": "#8b0836",
  "High": "#ec003f",
}
const tasksSortByPriority = {
  "Critical": 0,
  "High": 1,
  "Medium": 2,
  "Low": 3,
}
const tasksSortByStatus = {
  "In Progress": 0,
  "On Hold": 1,
  "Completed": 2,
  "Overdue": 3,
}

export class DashboardScreen {
  private hash: string = "";

  private employeesStackedProgressBar: StackedProgressBar = new StackedProgressBar();  
  private tasksStackedProgressBar: StackedProgressBar = new StackedProgressBar();  
  private payrollsTable: Table<Payroll> = new Table<Payroll>();
  private projectsTable: Table<Project> = new Table<Project>();

  constructor() {
    this.hash = generateHash();
  }

  render(container: HTMLElement): void {
    const payrollsTableProps = {
      title: "Recent Payrolls Activity",
      titleClassName: styles.payrollActivityTitle,
      showPagination: false,
      headers: ["Employee", "Total Amount", "Processed Date", "Status"],
      rows: payrolls.sort((a, b) => new Date(b.processedDate).getTime() - new Date(a.processedDate).getTime()).slice(0, 5),
      renderRow: (row: Payroll) => {
        return `
          <tr>
            <td style="color: var(--primary-color);">${getEmployeeById(row.employeeId)?.name}</td>
            <td>${formatCurrency(row.totalAmount)}</td>
            <td>${new Date(row.processedDate).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric" })}</td>
            <td>
              <span class="${styles.status} ${styles[row.status]}">
                ${statusIcons[row.status]}
                <span>${row.status}</span>
              </span>
            </td>
          </tr>
        `;
      }
    }
    const projectsTableProps = {
      title: "Recent Projects Activity",
      titleClassName: styles.projectsActivityTitle,
      showPagination: false,
      headers: ["Project", "Progress", "Priority", "Due Date"],
      rows: projects.slice(0, 5),
      renderRow: (row: Project) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td style="color: var(--primary-color);">${row.name}</td>
            <td>
              <div class="${styles.progressBarContainer}">
                <div class="${styles.progressBar}" data-progress="${row.progress}"></div>
                <span class="${styles.progressBarLabel}">${row.progress}%</span>
              </div>
            </td>
            <td><span class="${styles.PriorityBadge} ${styles[row.priority.toLowerCase()]}">${row.priority}</span></td>
            <td>${row.endDate.toLocaleDateString()}</td>
        `;

        const progressBar = new ProgressBar();
        progressBar.render(tr.querySelector(`[data-progress]`) as HTMLElement, { progress: row.progress, colors: progressBarColors });

        return tr.outerHTML;
      },
    }

    const activeProjects = projects.filter(project => ["Planning", "In Progress", "On Hold"].includes(project.currentStatus));
    const overdueProjects = projects.filter(project => project.endDate < new Date() && project.currentStatus === "Overdue");
    const tasksInProgress = tasks.filter(task => ["In Progress", "On Hold"].includes(task.currentStatus));
    const criticalTasks = tasks.filter(task => task.priority === "Critical");
    const activeDepartments = departments.filter(department => department.status === "active");
    const totalPayrollThisMonth = payrolls.reduce((acc, payroll) => 
      new Date(payroll.processedDate).getMonth() === new Date().getMonth() &&
      new Date(payroll.processedDate).getFullYear() === new Date().getFullYear()
        ? acc + payroll.totalAmount : acc, 0);

    const totalEmployees = employees.length;
    const totalTasks = tasks.length;

    const tasksToShow = tasks
      .filter(task => task.progress < 100)
      .sort((a, b) => tasksSortByPriority[a.priority] - tasksSortByPriority[b.priority])
      .sort((a, b) => tasksSortByStatus[a.currentStatus] - tasksSortByStatus[b.currentStatus])
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 5);

    const dashboard = document.createElement("div");
    dashboard.className = styles.dashboard;
    dashboard.innerHTML = `
      <div class="${styles.block} ${styles.activeProjects}">
        <h3 class="${styles.statTitle}">Active Projects</h3>
        <div class="${styles.statValueRow}">
          <p class="${styles.statValue}">${activeProjects.length}</p>
          <span class="${styles.overdueBadge}">${overdueProjects.length} overdue</span>
        </div>
      </div>
      <div class="${styles.block} ${styles.tasksInProgress}">
        <h3 class="${styles.statTitle}">Tasks in Progress</h3>
        <div class="${styles.statValueRow}">
          <p class="${styles.statValue}">${tasksInProgress.length}</p>
          <span class="${styles.overdueBadge}">${criticalTasks.length} critical</span>
        </div>
      </div>
      <div class="${styles.block} ${styles.activeDepartments}">
        <h3 class="${styles.statTitle}">Active Departments</h3>
        <p class="${styles.statValue}">${activeDepartments.length}</p>
      </div>
      <div class="${styles.block} ${styles.totalPayroll}">
        <h3 class="${styles.statTitle}">Total Payroll this month</h3>
        <p class="${styles.statValue}">${formatCurrency(totalPayrollThisMonth)}</p>
      </div>

      <div class="${styles.block} ${styles.totalEmployees}">
        <h3 class="${styles.statTitle}">Total Employees</h3>
        <p class="${styles.statValue}">${totalEmployees}</p>
        <div id="${this.hash}-employees-stacked-progress-bar"></div>
      </div>
      <div class="${styles.block} ${styles.totalTasks}">
        <h3 class="${styles.statTitle}">Total Tasks</h3>
        <p class="${styles.statValue}">${totalTasks}</p>
        <div id="${this.hash}-tasks-stacked-progress-bar"></div>
      </div>
      <div class="${styles.block} ${styles.tasksProgress}">
        <h3 class="${styles.statTitle}">Tasks Progress</h3>
        <div class="${styles.taskProgressContainer}">
          ${tasksToShow.map(task => `
            <div class="${styles.taskProgressItem}">
              <span class="${styles.taskProgressLabel}">${task.name}</span>
              <div class="${styles.taskProgressBar}" id="${this.hash}-task-progress-bar-${task.id}" data-progress="${task.progress}"></div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="${styles.payrollActivity}">
        <div id="${this.hash}-payroll-activity-table"></div>
      </div>
      <div class="${styles.projectsProgress}">
        <div id="${this.hash}-projects-progress-table"></div>
      </div>
    `;

    this.employeesStackedProgressBar.render(dashboard.querySelector(`#${this.hash}-employees-stacked-progress-bar`) as HTMLElement, {
      data: employees.reduce((acc, employee) => {
        if (acc.find((item) => item.label === employee.employmentType)) {
          acc.find((item) => item.label === employee.employmentType)!.value += 1;
        } else {
          acc.push({
            label: employee.employmentType,
            value: 1,
            color: employeesProgressBarColors[employee.employmentType],
          });
        }
        return acc;
      }, [] as { label: string, value: number, color: string }[]).sort((a, b) => employeesSort[b.label as keyof typeof employeesSort] - employeesSort[a.label as keyof typeof employeesSort]),
    });
    this.tasksStackedProgressBar.render(dashboard.querySelector(`#${this.hash}-tasks-stacked-progress-bar`) as HTMLElement, {
      data: tasks.reduce((acc, task) => {
        if (acc.find((item) => item.label === task.priority)) {
          acc.find((item) => item.label === task.priority)!.value += 1;
        } else {
          acc.push({
            label: task.priority,
            value: 1,
            color: tasksProgressBarColors[task.priority],
          });
        }
        return acc;
      }, [] as { label: string, value: number, color: string }[]).sort((a, b) => tasksSortByPriority[b.label as keyof typeof tasksSortByPriority] - tasksSortByPriority[a.label as keyof typeof tasksSortByPriority]),
    });
    dashboard.querySelectorAll(`[data-progress]`).forEach(task => {
      const progressBar = new ProgressBar();
      const progress = parseInt(task.getAttribute("data-progress") || "0");
      progressBar.render(task as HTMLElement, { 
        progress: progress, 
        colors: progressBarColors,
        height: 20,
        numberOfLines: 50,
        lineWidth: 4,
        lineGap: 2,
      });
    });
    this.payrollsTable.render(dashboard.querySelector(`#${this.hash}-payroll-activity-table`) as HTMLElement, payrollsTableProps);
    this.projectsTable.render(dashboard.querySelector(`#${this.hash}-projects-progress-table`) as HTMLElement, projectsTableProps);

    container.appendChild(dashboard);
  }
}
