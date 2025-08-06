import styles from "./HorizontalBarGraph.module.css";
import { generateHash } from "../../utils/helpers";

type HorizontalBarGraphDataItem = {
  label: string;
  value: number;
};

interface HorizontalBarGraphProps {
  data: HorizontalBarGraphDataItem[];
  colors: string[];
  formatValue: (value: number) => string;
}

const getColor = (colors: string[], percentage: number) => {
  const color1 = colors[0];
  const color2 = colors[1];

  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);
  
  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * percentage);
  const g = Math.round(g1 + (g2 - g1) * percentage);
  const b = Math.round(b1 + (b2 - b1) * percentage);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export class HorizontalBarGraph {
  private hash: string = "";

  constructor() {
    this.hash = generateHash();
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
