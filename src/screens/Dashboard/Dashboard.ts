import styles from "./Dashboard.module.css";

export class DashboardScreen {
  render(container: HTMLElement): void {
    const dashboard = document.createElement("div");
    dashboard.className = styles.dashboard;
    dashboard.innerHTML = `
      <h1>Dashboard</h1>
    `;
    container.appendChild(dashboard);
  }
}
