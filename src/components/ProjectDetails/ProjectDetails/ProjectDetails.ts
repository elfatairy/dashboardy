import { getDepartmentById } from "../../../data/departments";
import { getProjectById } from "../../../data/projects";
import { progressBarColors } from "../../../utils/constants";
import { ProgressBar } from "../../ui/ProgressBar/ProgressBar";
import styles from "./ProjectDetails.module.css";

interface ProjectDetailsProps {
  projectId: string;
}

export class ProjectDetails {
  // private hash: string = "";
  
  private progressBar: ProgressBar = new ProgressBar();

  constructor() {
    // this.hash = generateHash();
  }

  render(container: HTMLElement, props: ProjectDetailsProps): void {
    const project = getProjectById(props.projectId);

    if (!project) {
      return;
    }

    const projectDetailsContainer = document.createElement("div");
    projectDetailsContainer.className = styles.projectDetailsContainer;
    projectDetailsContainer.innerHTML = `
      <h3 class="${styles.projectTitle}">${project.name}</h3>
      <p class="${styles.projectDescription}">${project.description}</p>
      <div class="${styles.row}">
        <div class="${styles.dateContainer}">
          <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M3 9H21M17 13.0014L7 13M10.3333 17.0005L7 17M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" stroke-width="1.8960000000000001" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          <span class="${styles.rowItemValue}">
            ${new Date(project.startedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </span>
        </div>

        <div class="${styles.rowItem}">
          <span class="${styles.statusTag} ${styles[project.currentStatus.toLowerCase().replace(" ", "-")]}">${project.currentStatus}</span>
        </div>
      </div>
      <div class="${styles.row}">
        <div class="${styles.dateContainer}">
          <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C16.4183 21 20 17.6439 20 13.504C20 9.76257 17.9654 6.83811 16.562 5.44436C16.3017 5.18584 15.8683 5.30006 15.7212 5.63288C14.9742 7.3229 13.4178 9.75607 11.4286 9.75607C10.1975 9.92086 8.31688 8.86844 9.83483 3.64868C9.97151 3.17868 9.46972 2.80113 9.08645 3.11539C6.9046 4.90436 4 8.51143 4 13.504C4 17.6439 7.58172 21 12 21Z" stroke="currentColor" stroke-width="2.376"></path> </g></svg>
          <span class="${styles.rowItemValue}">
            ${new Date(project.endDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </span>
        </div>
        
        ${
          new Date(project.endDate).getTime() - new Date().getTime() > 0 ? `
            <div class="${styles.rowItem}">
              <span class="${styles.daysRemaining}">${Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining</span>
            </div>
          ` : ``
        }
      </div>
      <div class="${styles.row} ${styles.priorityDepartmentRow}">
        <div class="${styles.rowItem}">
          <span class="${styles.PriorityBadge} ${styles[project.priority.toLowerCase()]}">${project.priority} Priority</span>
        </div>

        <div class="${styles.rowItem} ${styles.departmentsContainerRow}">
          <div class="${styles.departmentsContainer}">
            ${
              project.departments.map((departmentId) => {
                const department = getDepartmentById(departmentId);
                if (!department) {
                  return "";
                }
                return `
                  <span class="${styles.department}">${department.name}</span>
                `;
              }).join("")
            }
          </div>
        </div>
      </div>

      <div class="${styles.progressContainer}">
        <span class="${styles.progressLabel}">Progress</span>
        <div class="${styles.progressBar}" data-progress="${project.progress}"></div>
        <span class="${styles.progressValue}">${project.progress}%</span>
      </div>

      <div class="${styles.objectivesContainer}">
        <h4 class="${styles.objectivesTitle}">Objectives:</h4>
        <ul class="${styles.objectivesList}">
          ${project.objectives.map((objective) => {
            return `<li class="${styles.objective}">${objective}</li>`;
          }).join("")}
        </ul>
    `;

    this.progressBar.render(projectDetailsContainer.querySelector(`[data-progress]`) as HTMLElement, { 
      progress: project.progress, 
      colors: progressBarColors,
      height: 20,
      numberOfLines: window.innerWidth < 2000 ? 30 : window.innerWidth < 2200 ? 40 : 50
    });

    container.appendChild(projectDetailsContainer);
  }
}
