import styles from "./ProjectDetails.module.css";
import { generateHash } from "../../utils/helpers";
import { ProjectDetails } from "../../components/ProjectDetails/ProjectDetails/ProjectDetails";

export class ProjectDetailsScreen {
  private hash: string = "";

  private projectDetails: ProjectDetails = new ProjectDetails();

  constructor() {
    this.hash = generateHash();
  }

  render(container: HTMLElement): void {
    const projectDetailsContainer = document.createElement("div");
    projectDetailsContainer.className = styles.projectDetails;
    projectDetailsContainer.innerHTML = `
      <div class="${styles.projectDetailsHeader}">
        <button class="${styles.projectDetailsHeaderBackButton}">
          <svg width="24px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" stroke-width="1.8240000000000003" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          <h2 class="${styles.projectDetailsHeaderTitle}">Projects</h2>
        </button>
      </div>
      <div class="${styles.projectDetailsContent}">
        <div class="${styles.block} ${styles.projectDetailsContainer}" id="${this.hash}-project-details-container"></div>
        <div class="${styles.block} ${styles.projectTasksContainer}" id="${this.hash}-project-tasks-container"></div>
      </div>
    `;

    const projectId = window.location.pathname.split("/").pop() || "";

    this.projectDetails.render(projectDetailsContainer.querySelector(`#${this.hash}-project-details-container`) as HTMLElement, { projectId });

    container.appendChild(projectDetailsContainer);
  }
}
