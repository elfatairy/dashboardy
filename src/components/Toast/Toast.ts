import styles from "./Toast.module.css";

export class Toast {
  // private hash: string = "";
  
  private toast: HTMLElement | null = null;
  private toastMessage: HTMLElement | null = null;

  constructor() {
    // this.hash = generateHash();
  }

  render(container: HTMLElement): void {
    this.toast = document.createElement("div");
    this.toast.className = styles.toast;

    this.toastMessage = document.createElement("span");
    this.toastMessage.className = styles.toastMessage;
    this.toast.appendChild(this.toastMessage);

    container.appendChild(this.toast);
  }

  show(message: string): void {
    if (!this.toast || this.toast.classList.contains(styles.show)) return;
    this.toast.classList.add(styles.show);
    this.toastMessage = this.toast.querySelector(`.${styles.toastMessage}`);
    if (this.toastMessage) {
      this.toastMessage.textContent = message;
    }

    setTimeout(() => {
      this.hide();
    }, 2000);
  }

  hide(): void {
    if (!this.toast) return;
    this.toast.classList.remove(styles.show);
  }
  
  
}
