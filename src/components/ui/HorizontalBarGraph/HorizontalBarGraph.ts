import styles from "./HorizontalBarGraph.module.css";
import { getColor } from "../../../utils/helpers";

type HorizontalBarGraphDataItem = {
  label: string;
  value: number;
};

interface HorizontalBarGraphProps {
  data: HorizontalBarGraphDataItem[];
  colors: [string, string];
  formatValue: (value: number) => string;
}

export class HorizontalBarGraph {
  // private hash: string = "";

  constructor() {
    // this.hash = generateHash();
  }

  render(container: HTMLElement, props: HorizontalBarGraphProps): void {
    const data = props.data;

    const maxValue = Math.max(...data.map(item => item.value));
    
    const barGraphContainer = document.createElement("div");
    barGraphContainer.className = styles.graph;
    barGraphContainer.innerHTML = data.map(item => `
      <div class="${styles.graphItem}">
        <div class="${styles.graphLabelText}">${item.label}</div>
        <div class="${styles.graphItemValueContainer}">
          <div class="${styles.graphItemValue}" style="--color: ${getColor(props.colors, item.value / maxValue)}; width: ${item.value / maxValue * 100}%"></div>
        </div>
        <div class="${styles.graphItemValueText}">${props.formatValue(item.value)}</div>
      </div>
    `).join("");

    container.appendChild(barGraphContainer);
  }
}
