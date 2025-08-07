import "./index.css";
import styles from "./App.module.css";
import { Navbar } from "./src/components/Navbar/Navbar.ts";
import { Header } from "./src/components/Header/Header.ts";
import { navItems } from "./src/utils/constants.ts";
import { PayrollScreen } from "./src/screens/Payroll/Payroll.ts";
import { DashboardScreen } from "./src/screens/Dashboard/Dashboard.ts";
import { generateHash } from "./src/utils/helpers.ts";
import { EmployeesScreen } from "./src/screens/Employees/Employees.ts";
import { DepartmentsScreen } from "./src/screens/Departments/Departments.ts";
import { ProjectsScreen } from "./src/screens/Projects/Projects.ts";
import { TasksScreen } from "./src/screens/Tasks/Tasks.ts";
import { ProjectDetailsScreen } from "./src/screens/ProjectDetails/ProjectDetails.ts";

export class App {
  private hash: string = "";

  navbar: Navbar = new Navbar();
  header: Header = new Header();
  router: Router = new Router({
    showHeader: (show: boolean) => this.showHeader(show)
  });

  constructor() {
    this.hash = generateHash();
    const root = document.getElementById("root");
    if (!root) {
      throw new Error("Root element not found");
    }
    this.init(root);
  }

  protected init(root: HTMLElement): void {
    const container = document.createElement("div");
    container.className = styles.app;
    container.innerHTML = `
      <nav id="${this.hash}-navbar-container"></nav>
      <main id="content-container" class="${styles.contentContainer}">
        <header id="${this.hash}-header-container"></header>
        <div id="${this.hash}-router-container" class="${styles.routerContainer}"></div>
      </main>
    `;

    this.navbar.render(
      container.querySelector(`#${this.hash}-navbar-container`) as HTMLElement
    );

    this.header.render(
      container.querySelector(`#${this.hash}-header-container`) as HTMLElement
    );

    this.router.render(
      container.querySelector(`#${this.hash}-router-container`) as HTMLElement
    );

    root.appendChild(container);
  }

  private showHeader(show: boolean): void {
    if (!this.header) return;
    if (show) {
      this.header.show();
    } else {
      this.header.hide();
    }
  }
}

interface RouterProps {
  showHeader: (show: boolean) => void;
}


class Router {
  private routerContainer: HTMLElement | null = null;
  private Dashboard: DashboardScreen = new DashboardScreen();
  private Projects: ProjectsScreen = new ProjectsScreen();
  private Tasks: TasksScreen = new TasksScreen();
  private Departments: DepartmentsScreen = new DepartmentsScreen();
  private Employees: EmployeesScreen = new EmployeesScreen();
  private Payroll: PayrollScreen = new PayrollScreen();
  private ProjectDetails: ProjectDetailsScreen = new ProjectDetailsScreen();
  private showHeader: (show: boolean) => void;

  constructor(props: RouterProps) {
    this.showHeader = props.showHeader;
    window.addEventListener("spa-navigate", () => this.renderCurrentScreen());
  }

  render(container: HTMLElement): void {
    this.routerContainer = document.createElement("div");
    this.renderCurrentScreen();
    container.appendChild(this.routerContainer);
  }

  private renderCurrentScreen(): void {
    let currentItemName = navItems.find((item) => item.href === window.location.pathname)?.name;
    if (!currentItemName) {
      if (window.location.pathname.includes("/projects/")) {
        currentItemName = "ProjectDetails";
      } else {
        currentItemName = navItems[0].name;
      }
    }
    this.routerContainer!.innerHTML = "";
    switch (currentItemName) {
      case "Projects":
        this.Projects.render(this.routerContainer!);
        break;
      case "Tasks":
        this.Tasks.render(this.routerContainer!);
        break;
      case "Departments":
        this.Departments.render(this.routerContainer!);
        break;
      case "Employees":
        this.Employees.render(this.routerContainer!);
        break;
      case "Payroll":
        this.Payroll.render(this.routerContainer!);
        break;
      case "ProjectDetails":
        this.showHeader(false);
        this.ProjectDetails.render(this.routerContainer!);
        break;
      case "Dashboard":
      default:
        this.Dashboard.render(this.routerContainer!);
        break;
    }
  }
}
