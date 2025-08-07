import styles from "./Header.module.css";
import { NavItem, navItems } from "../../utils/constants";
import { generateHash } from "../../utils/helpers";

export class Header {
  private hash: string = "";
  navItem: NavItem;
  headerLeft: Element | null = null;
  header: HTMLElement | null = null;

  constructor() {
    this.hash = generateHash();
    const path = window.location.pathname;
    this.navItem = navItems.find((item) => item.href === path) || navItems[0];

    window.addEventListener("spa-navigate", () => {
      if (!this.headerLeft) return;

      this.navItem = navItems.find((item) => item.href === window.location.pathname) || navItems[0];
      this.updateHeaderLeft(this.headerLeft);
    });
  }
  
  render(container: HTMLElement): void {
    this.header = document.createElement("div");
    this.header.className = styles.header;
    this.header.innerHTML = `
      <div class="${styles.headerLeft}" id="${this.hash}-header-left"></div>
    `;
    this.headerLeft = this.header.querySelector(`#${this.hash}-header-left`);
    this.updateHeaderLeft(this.headerLeft!);
    container.appendChild(this.header);
  }

  show(): void {
    if (this.header) {
      this.header.style.display = "block";
    }
  }

  hide(): void {
    if (this.header) {
      this.header.style.display = "none";
    }
  }

  private updateHeaderLeft(headerLeft: Element): void {
    if (headerLeft && this.header) {
      this.header.style.display = "block";
      headerLeft.innerHTML = `
      ${this.navItem.icon}
      <h2 class="${styles.title}">${this.navItem.name}</h2>
    `;
    }
  }
}
