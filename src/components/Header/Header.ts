import styles from "./Header.module.css";
import { NavItem, navItems } from "../../utils/constants";
import { generateHash } from "../../utils/helpers";

export class Header {
  private hash: string = "";
  navItem: NavItem;
  headerLeft: Element | null = null;

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
    const header = document.createElement("div");
    header.className = styles.header;
    header.innerHTML = `
      <div class="${styles.headerLeft}" id="${this.hash}-header-left"></div>
    `;
    this.headerLeft = header.querySelector(`#${this.hash}-header-left`);
    this.updateHeaderLeft(this.headerLeft!);
    container.appendChild(header);
  }

  private updateHeaderLeft(headerLeft: Element): void {
    if (headerLeft) {
      headerLeft.innerHTML = `
      ${this.navItem.icon}
      <h2 class="${styles.title}">${this.navItem.name}</h2>
    `;
    }
  }
}
