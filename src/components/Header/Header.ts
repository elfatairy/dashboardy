import styles from "./Header.module.css";
import { NavItem, navItems } from "../../utils/constants";
import { generateHash } from "../../utils/helpers";

interface HeaderProps {
  openMenu: () => void;
}

export class Header {
  private hash: string = "";
  navItem: NavItem;
  headerLeft: Element | null = null;
  header: HTMLElement | null = null;

  openMenu: () => void = () => {};  

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
  
  render(container: HTMLElement, props: HeaderProps): void {
    this.openMenu = props.openMenu;
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
      ${window.innerWidth > 768 ? this.navItem.icon : `
        <button class="${styles.menuButton}">
          <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
      `}
      <h2 class="${styles.title}">${this.navItem.name}</h2>
    `;

    const menuButton = headerLeft.querySelector(`.${styles.menuButton}`);
    if (menuButton) {
      menuButton.addEventListener("click", () => {
          this.openMenu();
        });
      }
    }
  }
}
