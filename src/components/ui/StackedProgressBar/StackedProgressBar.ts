import styles from "./StackedProgressBar.module.css";
import { generateHash } from "../../../utils/helpers";

interface StackedProgressBarProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
}

export class StackedProgressBar {
  private hash: string = "";

  constructor() {
    this.hash = generateHash();
  }

  render(container: HTMLElement, props: StackedProgressBarProps): void {
    const { data } = props;

    const totalValue = data.reduce((acc, item) => acc + item.value, 0);

    const stackedProgressBar = document.createElement("div");
    stackedProgressBar.className = styles.stackedProgressBar;
    stackedProgressBar.innerHTML = `
      <div class="${styles.progressBarContainer}">
        ${data.map((item) => `<div class="${styles.progressBarItem}" style="background-color: ${item.color}; width: ${item.value / totalValue * 100}%;"></div>`).join("")}
      </div>
      <div class="${styles.progressBarLabels}">
        ${
          data.map((item) => `
            <div class="${styles.progressBarLabel}">
              <span class="${styles.progressBarLabelDot}" style="background-color: ${item.color};"></span>
              <span class="${styles.progressBarLabelValue}">${item.label}</span>
            </div>
          `).join("")}
      </div>
    `;
    
    container.appendChild(stackedProgressBar);
  }
}
