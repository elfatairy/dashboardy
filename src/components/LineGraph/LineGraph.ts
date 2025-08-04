import styles from "./LineGraph.module.css";
import { generateHash } from "../../utils/helpers";

interface LineGraphProps {
  data: {
    value: number;
    label: string;
  }[];
}

export class LineGraph {
  private hash: string = "";

  private data: LineGraphProps["data"] = [];
  private canvas: HTMLCanvasElement | null = null;
  private labelsDiv: HTMLElement | null = null;

  constructor() {
    this.hash = generateHash();
  }
  
  render(container: HTMLElement, props: LineGraphProps): void {
    this.data = props.data;

    const lineGraph = document.createElement("div");
    lineGraph.className = styles.lineGraph;
    lineGraph.innerHTML = `
      <canvas id="${this.hash}-line-graph-canvas"></canvas>
      <div class="${styles.lineGraphLabels}"></div>
    `;

    this.canvas = lineGraph.querySelector(`#${this.hash}-line-graph-canvas`) as HTMLCanvasElement;
    this.canvas.width = 1000;
    this.canvas.height = 500;
    this.labelsDiv = lineGraph.querySelector(`.${styles.lineGraphLabels}`) as HTMLElement;
    this.renderLineGraph();
    container.appendChild(lineGraph);
  }

  private getHeightOfPoint(value: number, minValue: number, maxValue: number, verticalPadding: number): number {
    if (!this.canvas) return 0;
    return this.canvas.height - (value - minValue) / (maxValue - minValue) * this.canvas.height * (1 - 2 * verticalPadding) - this.canvas.height * verticalPadding;
  }

  private renderLineGraph(): void {
    if (!this.canvas || !this.labelsDiv) return;

    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const maxValue = Math.max(...this.data.map((item) => item.value));
    const minValue = Math.min(...this.data.map((item) => item.value));

    ctx.beginPath();
    ctx.moveTo(0, this.canvas.height);

    const verticalPadding = .2;
    const horizontalPadding = 60;

    ctx.beginPath();
    ctx.strokeStyle = "#aeafb922";
    ctx.lineWidth = 8;
    for (let i = 0; i < this.data.length - 1; i++) {
      const x = (i / (this.data.length - 1)) * (this.canvas.width - 2 * horizontalPadding) + horizontalPadding;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.canvas.height);
    }
    ctx.stroke();
    
    ctx.beginPath();
    ctx.setLineDash([20, 20]);
    ctx.strokeStyle = "#aeafb933";
    const x = (this.canvas.width - 2 * horizontalPadding) + horizontalPadding;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, this.canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.beginPath();
    ctx.strokeStyle = "#484b6a";
    ctx.lineWidth = 12;
    ctx.moveTo(horizontalPadding, this.getHeightOfPoint(this.data[0].value, minValue, maxValue, verticalPadding));
    
    for (let i = 1; i < this.data.length; i++) {
      const x = (i / (this.data.length - 1)) * (this.canvas.width - 2 * horizontalPadding) + horizontalPadding;
      const y = this.getHeightOfPoint(this.data[i].value, minValue, maxValue, verticalPadding);
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw circle above the last point
    const lastIndex = this.data.length - 1;
    const lastX = (lastIndex / (this.data.length - 1)) * (this.canvas.width - 2 * horizontalPadding) + horizontalPadding;
    const lastY = this.getHeightOfPoint(this.data[lastIndex].value, minValue, maxValue, verticalPadding);
    
    ctx.beginPath();
    ctx.fillStyle = "#484b6a22";
    ctx.arc(lastX, lastY, 60, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(lastX, lastY, 34, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#484b6a";
    ctx.arc(lastX, lastY, 26, 0, 2 * Math.PI);
    ctx.fill();

    this.labelsDiv.innerHTML = this.data.map((item) => `
      <span class="${styles.lineGraphLabelText}">${item.label}</span>
    `).join("");
  }
}
