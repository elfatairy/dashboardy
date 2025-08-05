import styles from "./BarGraph.module.css";
import { generateHash } from "../../utils/helpers";

interface BarGraphProps {
  data: {
    label: string;
    values: {
      value: number;
      color: string;
    }[];
  }[];
}

export class BarGraph {
  private hash: string = "";

  constructor() {
    this.hash = generateHash();
  }

  render(container: HTMLElement, props: BarGraphProps): void {
    const data = props.data;

    const maxValue = Math.max(...data.map(item => item.values.reduce((acc, value) => acc + value.value, 0)));
    
    const barGraphContainer = document.createElement("div");
    barGraphContainer.className = styles.barGraph;
    barGraphContainer.innerHTML = data.map(item => `
      <div class="${styles.barGraphItem}">
        <div class="${styles.barGraphItemValues}">
          ${item.values.map(value => `
            <div class="${styles.barGraphItemValueContainer}">
              <div class="${styles.barGraphItemValue}" style="--color: ${value.color}; height: ${value.value / maxValue * 100}%"></div>
            </div>
          `).join("")}
        </div>
        <div class="${styles.barGraphLabelText}">${item.label}</div>
      </div>
    `).join("");

    container.appendChild(barGraphContainer);
  }
}
