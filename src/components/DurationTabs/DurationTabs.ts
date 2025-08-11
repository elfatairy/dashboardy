import styles from "./DurationTabs.module.css";
import { durationOptions } from "../../utils/constants";

interface DurationTabsProps {
  onChange: (value: string) => void;
}

export class DurationTabs {
  // private hash: string = "";

  private currentDuration: string = "30-days";
  private onChange: (value: string) => void = () => {};

  constructor() {
    // this.hash = generateHash();
  }
  
  render(container: HTMLElement, props: DurationTabsProps): void {
    this.onChange = props.onChange;

    const tabsContainer = document.createElement("div");
    tabsContainer.className = styles.tabsContainer;
    tabsContainer.innerHTML = `
      ${durationOptions.map((option) => `
        <button class="${styles.tab} ${this.currentDuration === option.tag ? styles.tabActive : ""}" data-value="${option.tag}">
          ${option.label}
        </button>
      `).join("")}
    `;

    tabsContainer.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;
      if (target.classList.contains(styles.tab)) {
        this.currentDuration = target.dataset.value!;
        this.onChange(this.currentDuration);
        container.innerHTML = "";
        this.render(container, props);
      }
    });
    container.appendChild(tabsContainer);
  }
}
