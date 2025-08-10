import styles from "./ProgressBar.module.css";
import { generateHash, getColor, getRootFontSize } from "../../../utils/helpers";

interface ProgressBarProps {
  progress: number;
  height?: number;
  numberOfLines?: number;
  lineGap?: number;
  lineWidth?: number;
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

    const lineWidth = props.lineWidth ?? 3 * getRootFontSize() / 16;
    const lineHeight = props.height ?? 15 * getRootFontSize() / 16;
    const lineGap = props.lineGap ?? 1.5 * getRootFontSize() / 16 ;
    const lineCount = props.numberOfLines ?? 15;
    const svgWidth = lineWidth * lineCount + lineGap * (lineCount - 1);
    const color = getColor(props.colors, props.progress / 100);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", svgWidth.toString());
    svg.setAttribute("height", lineHeight.toString());
    svg.setAttribute("viewBox", `0 0 ${svgWidth} ${lineHeight}`);
    
    for (let i = 0; i < lineCount; i++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      line.setAttribute("x", (i * (lineWidth + lineGap)).toString());
      line.setAttribute("y", "0");
      line.setAttribute("width", lineWidth.toString());
      line.setAttribute("height", lineHeight.toString());
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