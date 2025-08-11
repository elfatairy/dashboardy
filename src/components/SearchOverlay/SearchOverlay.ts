import styles from "./SearchOverlay.module.css";
import { icons } from "../../utils/constants";

export interface SearchResultItem {
  icon: string;
  title: string;
  href: string;
}

interface SearchOverlayProps {
  onSearch: (query: string) => SearchResultItem[];
}

const defaultSearchResults: SearchResultItem[] = [
  {
    title: "Projects",
    icon: icons.projects,
    href: "/projects",
  },
  {
    title: "Tasks",
    icon: icons.tasks,
    href: "/tasks",
  },
  
  {
    title: "Departments",
    icon: icons.departments,
    href: "/departments",
  },
  {
    title: "Employees",
    icon: icons.employees,
    href: "/employees",
  },
  {
    title: "Payroll",
    icon: icons.payroll,
    href: "/payroll",
  },
];

export class SearchOverlay {
  // private hash: string = "";
  private searchOverlay: HTMLElement | undefined;
  private resultsContainer: HTMLElement | undefined;
  private searchInput: HTMLInputElement | undefined;

  constructor() {
    // this.hash = generateHash();
  }

  render(container: HTMLElement, props: SearchOverlayProps): void {
    this.searchOverlay = document.createElement("div");
    this.searchOverlay.className = styles.searchOverlay;
    this.searchOverlay.setAttribute('data-testid', 'search-overlay');
    this.searchOverlay.innerHTML = `
      <div class="${styles.searchOverlayContainer}">
        <div class="${styles.searchOverlayHeader}">
          <input type="text" class="${styles.searchOverlayInput}" placeholder="Search..." />
          <svg class="${styles.searchIcon}" width="1.125rem" height="1.125rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>

        <div class="${styles.searchOverlayResults}"></div>
      </div>
    `;

    this.resultsContainer = this.searchOverlay.querySelector(`.${styles.searchOverlayResults}`) as any;
    // @ts-ignore
    this.resultsContainer.buttonClickHandler = this.buttonClickHandler.bind(this);

    this.searchInput = this.searchOverlay.querySelector(`.${styles.searchOverlayInput}`) as HTMLInputElement;
    this.searchInput.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value;
      if (query.length > 0) {
        const results = props.onSearch(query);
        this.renderResults(results);
      } else {
        this.renderResults(defaultSearchResults);
      }
    });

    this.searchOverlay.addEventListener('click', (e) => {
      if (e.target === this.searchOverlay) {
        this.hide();
      }
    });

    this.renderResults(defaultSearchResults);
    this.hide();

    container.appendChild(this.searchOverlay);
  }

  private renderResults(results: SearchResultItem[]): void {
    if (!this.resultsContainer) return;

    this.resultsContainer.innerHTML = results.slice(0, 8).map(result => `
      <a 
        href="${result.href}"
        onclick="event.preventDefault(); this.closest('.${styles.searchOverlayResults}').buttonClickHandler('${result.href}'); return false;"
        class="${styles.searchOverlayResultItem}" 
      >
        <div class="${styles.searchOverlayResultItemLeft}">
          ${result.icon}
          <span class="${styles.searchOverlayResultItemTitle}">${result.title}</span>
        </div>

        <svg width="1.125rem" height="1.125rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M10 16L14 12L10 8" stroke="#200E32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </a>
    `).join('')
  }

  private buttonClickHandler(href: string): void {
    history.pushState(null, '', href);
    window.dispatchEvent(new CustomEvent('spa-navigate', { detail: { href } }));
    this.hide();
  }

  show() {
    if (!this.searchOverlay) return;
    this.searchOverlay.classList.add(styles.shown);
    this.searchInput?.focus();

    this.searchOverlay?.querySelectorAll('a, button, input, [tabindex]').forEach(a => {
      (a as HTMLElement).tabIndex = 0;
    });
  }

  hide() {
    if (!this.searchOverlay) return;
    this.searchOverlay.classList.remove(styles.shown);

    this.searchOverlay?.querySelectorAll('a, button, input, [tabindex]').forEach(a => {
      (a as HTMLElement).tabIndex = -1;
    });
  }
}
