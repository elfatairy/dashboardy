import styles from "./ToolTip.module.css";

export class ToolTip {
  private toolTipContainer: HTMLElement | null = null;

  render(container: HTMLElement): void {
    this.toolTipContainer = document.createElement("div");
    this.toolTipContainer.className = styles.toolTip;

    container.appendChild(this.toolTipContainer);
  }

  show(content: HTMLElement, position: { x: number, y: number }): void {
    if (!this.toolTipContainer) return;

    console.log(position);
    this.toolTipContainer.classList.add(styles.show);
    this.toolTipContainer.innerHTML = content.innerHTML;
    this.toolTipContainer.style.left = `${position.x}px`;
    this.toolTipContainer.style.bottom = `${position.y}px`;
  }

  hide(): void {
    if (!this.toolTipContainer) return;

    this.toolTipContainer.classList.remove(styles.show);
  }
}
