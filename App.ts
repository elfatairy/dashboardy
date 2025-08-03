import "./index.css";
import styles from "./App.module.css";
import { Navbar } from "./src/components/Navbar/Navbar.ts";
import { Header } from "./src/components/Header/Header.ts";
import { navItems } from "./src/utils/navItems.ts";
import { PayrollScreen } from "./src/screens/Payroll/Payroll.ts";
import { DashboardScreen } from "./src/screens/Dashboard/Dashboard.ts";
import { generateHash } from "./src/utils/helpers.ts";

export class App {
  private hash: string = "";

  navbar: Navbar = new Navbar();
  header: Header = new Header();
  router: Router = new Router();

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
}

class Router {
  private routerContainer: HTMLElement | null = null;
  private Dashboard: DashboardScreen = new DashboardScreen();
  private Payroll: PayrollScreen = new PayrollScreen();

  constructor() {
    window.addEventListener("spa-navigate", () => this.renderCurrentScreen());
  }

  render(container: HTMLElement): void {
    this.routerContainer = document.createElement("div");
    this.renderCurrentScreen();
    container.appendChild(this.routerContainer);
  }

  private renderCurrentScreen(): void {
    const currentItem = navItems.find((item) => item.href === window.location.pathname) || navItems[0];
    this.routerContainer!.innerHTML = "";
    switch (currentItem.name) {
      case "Payroll":
        this.Payroll.render(this.routerContainer!);
        break;
      case "Dashboard":
      default:
        this.Dashboard.render(this.routerContainer!);
        break;
    }
  }
}
