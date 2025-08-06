import styles from "./ProgressBar.module.css";
import { generateHash, getColor } from "../../../utils/helpers";

interface ProgressBarProps {
  progress: number;
  colors: [string, string];
}

export class ProgressBar {
  private hash: string = "";

  constructor() {
    this.hash = generateHash();
  }
  
  render(container: HTMLElement, props: ProgressBarProps): void {
    const progressBar = document.createElement("div");
    progressBar.className = styles.progressBar;

    const lineWidth = 3;
    const lineGap = 1.5;
    const lineCount = 15;
    const svgWidth = lineWidth * lineCount + lineGap * (lineCount - 1);
    const color = getColor(props.colors, props.progress / 100);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", svgWidth.toString());
    svg.setAttribute("height", "15");
    svg.setAttribute("viewBox", `0 0 ${svgWidth} 15`);
    
    for (let i = 0; i < lineCount; i++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      line.setAttribute("x", (i * (lineWidth + lineGap)).toString());
      line.setAttribute("y", "0");
      line.setAttribute("width", lineWidth.toString());
      line.setAttribute("height", "15");
      line.setAttribute("rx", "2");
      
      if (i < (props.progress / 100) * lineCount) {
        line.setAttribute("fill", color);
      } else {
        line.setAttribute("fill", "var(--quaternary-color)");
      }
      
      svg.appendChild(line);
    }
    
    progressBar.appendChild(svg);
    container.appendChild(progressBar);
  }
}