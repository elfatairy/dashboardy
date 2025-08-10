import styles from "./ProjectsStats.module.css";
import { formatCurrency, generateHash } from "../../../utils/helpers";
import { projects } from "../../../data/projects";

export class ProjectsStats {
  private hash: string = "";

  constructor() {
    this.hash = generateHash();
  }
  
  render(container: HTMLElement): void {
    const totalProjects = projects.length;
    const overDueProjects = projects.filter((project) => project.endDate < new Date() && project.currentStatus !== "Completed").length;
    const activeProjects = projects.filter((project) => project.currentStatus === "In Progress").length;
    const totalProjectsBudgets = projects.reduce((acc, project) => acc + project.budget, 0);

    const block = document.createElement("div");
    block.className = styles.block;
    block.innerHTML = `
      <div class="${styles.blockItem}">
        <div class="${styles.blockItemLeft}">
          <span class="${styles.blockItemTitle}">Total Projects</span>
          <span class="${styles.blockItemValue}">${totalProjects}</span>
        </div>
        <div class="${styles.blockItemRight}">
          <svg width="2.5rem" height="2.5rem" viewBox="40 40 442 442" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>project</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Combined-Shape" fill="currentColor" transform="translate(64.000000, 34.346667)"> <path d="M192,7.10542736e-15 L384,110.851252 L384,332.553755 L192,443.405007 L1.42108547e-14,332.553755 L1.42108547e-14,110.851252 L192,7.10542736e-15 Z M42.666,157.654 L42.6666667,307.920144 L170.666,381.82 L170.666,231.555 L42.666,157.654 Z M341.333,157.655 L213.333,231.555 L213.333,381.82 L341.333333,307.920144 L341.333,157.655 Z M192,49.267223 L66.1333333,121.936377 L192,194.605531 L317.866667,121.936377 L192,49.267223 Z"> </path> </g> </g> </g></svg>
        </div>
      </div>
      <div class="${styles.blockItem}">
        <div class="${styles.blockItemLeft}">
          <span class="${styles.blockItemTitle}">Over Due Projects</span>
          <span class="${styles.blockItemValue}">${overDueProjects}</span>
        </div>
        <div class="${styles.blockItemRight}">
          <svg width="2.5rem" height="2.5rem" viewBox="2 2 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>ic_fluent_calendar_overdue_24_regular</title> <desc>Created with Sketch.</desc> <g id="🔍-System-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="ic_fluent_calendar_overdue_24_regular" fill="currentColor" fill-rule="nonzero"> <path d="M17.5,12 C20.5376,12 23,14.4624 23,17.5 C23,20.5376 20.5376,23 17.5,23 C14.4624,23 12,20.5376 12,17.5 C12,14.4624 14.4624,12 17.5,12 Z M17.5,19.875 C17.1548,19.875 16.875,20.1548 16.875,20.5 C16.875,20.8452 17.1548,21.125 17.5,21.125 C17.8452,21.125 18.125,20.8452 18.125,20.5 C18.125,20.1548 17.8452,19.875 17.5,19.875 Z M17.75,3 C19.5449,3 21,4.45507 21,6.25 L21,12.0218 C20.5368,11.7253 20.0335,11.4858 19.5,11.3135 L19.5,8.5 L4.5,8.5 L4.5,17.75 C4.5,18.7165 5.2835,19.5 6.25,19.5 L11.3135,19.5 C11.4858,20.0335 11.7253,20.5368 12.0218,21 L6.25,21 C4.45507,21 3,19.5449 3,17.75 L3,6.25 C3,4.45507 4.45507,3 6.25,3 L17.75,3 Z M17.5,14 C17.2239,14 17,14.2239 17,14.5 L17,18.5 C17,18.7761 17.2239,19 17.5,19 C17.7761,19 18,18.7761 18,18.5 L18,14.5 C18,14.2239 17.7761,14 17.5,14 Z M17.75,4.5 L6.25,4.5 C5.2835,4.5 4.5,5.2835 4.5,6.25 L4.5,7 L19.5,7 L19.5,6.25 C19.5,5.2835 18.7165,4.5 17.75,4.5 Z" id="🎨-Color"> </path> </g> </g> </g></svg>
        </div>
      </div>
      <div class="${styles.blockItem}">
        <div class="${styles.blockItemLeft}">
          <span class="${styles.blockItemTitle}">Active Projects</span>
          <span class="${styles.blockItemValue}">${activeProjects}</span>
        </div>
        <div class="${styles.blockItemRight}">
          <svg width="2.5rem" height="2.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12V8C21 5.79086 19.2091 4 17 4H7C4.79086 4 3 5.79086 3 8V17C3 19.2091 4.79086 21 7 21H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> <path d="M8 3V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> <path d="M17 10H7" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> <path d="M16 3V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> <path d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="currentColor" stroke-width="2"></path> </g></svg>
        </div>
      </div>
      <div class="${styles.blockItem}">
        <div class="${styles.blockItemLeft}">
          <span class="${styles.blockItemTitle}">Total Projects Budgets</span>
          <span class="${styles.blockItemValue}">${formatCurrency(totalProjectsBudgets)}</span>
        </div>
        <div class="${styles.blockItemRight}">
          <svg width="2.5rem" height="2.5rem" viewBox="2 2 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 19H6.2C5.0799 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V8.5M9 9.5V8.5M9 9.5H11.0001M9 9.5C7.88279 9.49998 7.00244 9.62616 7.0001 10.8325C6.99834 11.7328 7.00009 12 9.00009 12C11.0001 12 11.0001 12.2055 11.0001 13.1667C11.0001 13.889 11 14.5 9 14.5M9 15.5V14.5M9 14.5L7.0001 14.5M14 10H17M14 20L16.025 19.595C16.2015 19.5597 16.2898 19.542 16.3721 19.5097C16.4452 19.4811 16.5147 19.4439 16.579 19.399C16.6516 19.3484 16.7152 19.2848 16.8426 19.1574L21 15C21.5523 14.4477 21.5523 13.5523 21 13C20.4477 12.4477 19.5523 12.4477 19 13L14.8426 17.1574C14.7152 17.2848 14.6516 17.3484 14.601 17.421C14.5561 17.4853 14.5189 17.5548 14.4903 17.6279C14.458 17.7102 14.4403 17.7985 14.405 17.975L14 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>
      </div>
    `;

    container.appendChild(block);
  }
}
