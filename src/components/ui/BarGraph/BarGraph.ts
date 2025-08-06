import styles from "./BarGraph.module.css";
import { generateHash } from "../../../utils/helpers";

type BarGraphDataItem = {
  label: string;
  values: {
    value: number;
    color: string;
  }[];
};

interface BarGraphProps {
  data: BarGraphDataItem[];
  labelBlackenedBehaviour?: "last" | "never" | "on-hover";
  onHover?: (dataItem: BarGraphDataItem, position: { x: number, y: number }) => void;
  onLeave?: () => void;
}

export class BarGraph {
  private hash: string = "";

  private currentlyHoveredLabel: string | null = null;
  private hoverTimeout: NodeJS.Timeout | null = null;
  private mousePosition: { x: number, y: number } = { x: 0, y: 0 };
  private onHover: (dataItem: BarGraphDataItem, position: { x: number, y: number }) => void = () => {};
  private onLeave: () => void = () => {};


  constructor() {
    this.hash = generateHash();
  }

  render(container: HTMLElement, props: BarGraphProps): void {
    this.onHover = props.onHover ?? (() => {});
    this.onLeave = props.onLeave ?? (() => {});


    const data = props.data;

    const maxValue = Math.max(...data.map(item => item.values.reduce((acc, value) => acc + value.value, 0)));
    
    const barGraphContainer = document.createElement("div");
    barGraphContainer.className = styles.barGraph;
    barGraphContainer.innerHTML = data.map(item => `
      <div class="${styles.barGraphItem} ${styles[`label-${props.labelBlackenedBehaviour ?? "last"}`]}" data-label="${item.label}">
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

    const barGraphItems = barGraphContainer.querySelectorAll(`.${styles.barGraphItem}`);

    barGraphItems.forEach(item => {
      item.addEventListener("mousemove", (e) => {
        if (this.currentlyHoveredLabel) {
          this.mousePosition = { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
        }
      });

      item.addEventListener("mouseenter", (e) => {
        this.currentlyHoveredLabel = item.querySelector(`.${styles.barGraphLabelText}`)?.textContent ?? null;
        this.hoverTimeout = setTimeout(() => {
          if (this.currentlyHoveredLabel) {
            const dataItem = data.find(item => item.label === this.currentlyHoveredLabel);
            if (dataItem) {
              this.onHover(dataItem, this.mousePosition);
            }
          }
        }, 300);
      });

      item.addEventListener("mouseleave", () => {
        this.currentlyHoveredLabel = null;
        if (this.hoverTimeout) {
          clearTimeout(this.hoverTimeout);
        }
        this.onLeave();
      });
    });

    container.appendChild(barGraphContainer);
  }
}
