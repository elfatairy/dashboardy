import { generateHash } from "../../utils/helpers";
import { Dropdown, Option } from "../Dropdown/Dropdown";
import styles from "./Table.module.css";

type Row = {
  [key: string]: any;
};

interface TableProps<T extends Row> {
  headers: string[];
  rows: T[];
  renderRow: (row: T) => string;
  search: {
    placeholder: string;
    searchHandler: (value: string, allRows: T[]) => T[];
  };
  sorting?: {
    options: Option[];
    sortHandler: (option: string, allRows: T[]) => T[];
  };
  filtering?: {
    filters: {
      [key: string]: {
        options: Option[];
        icon?: string;
      };
    }
    filterHandler: (filter: keyof T, value: string, allRows: T[]) => T[];
  };
}

const PAGE_SIZE = 10;

export class Table<T extends Row> {
  private hash: string = "";

  topContainer: HTMLElement | null = null;
  tableBody: HTMLElement | null = null;
  paginationText: HTMLElement | null = null;
  prevButton: HTMLButtonElement | null = null;
  nextButton: HTMLButtonElement | null = null;
  paginationPagesContainer: HTMLElement | null = null;
  sortDropdown: Dropdown = new Dropdown();
  filterDropdowns: {
    [key: string]: Dropdown;
  } = {};


  headers: string[] = [];
  rawRows: T[] = [];
  handledRows: T[] = [];
  page: number = 0;

  searchValue: string | undefined;
  sortValue: string | undefined;
  filterValues: {
    [key: string]: string | undefined;
  } = {};

  renderRow: (row: T) => string = () => ""; 
  search: {
    placeholder: string;
    searchHandler: (value: string, allRows: T[]) => T[];
  } = {
    placeholder: "Search...",
    searchHandler: (value: string, allRows: T[]) => allRows,
  };
  sorting?: {
    options: Option[];
    sortHandler: (option: string, allRows: T[]) => T[];
  };
  filtering?: {
    filters: {
      [key: string]: {
        options: Option[];
        icon?: string;
      };
    }
    filterHandler: (filter: keyof T, value: string, allRows: T[]) => T[];
  };

  constructor() {
    this.hash = generateHash();
  }

  render(container: HTMLElement, props: TableProps<T>): void {
    this.headers = props.headers;
    this.rawRows = props.rows;
    this.handledRows = this.rawRows.sort(
      (a, b) =>
        new Date(b.processedDate).getTime() -
        new Date(a.processedDate).getTime()
    );
    this.renderRow = props.renderRow;
    this.search = props.search;
    this.sorting = props.sorting;
    this.filtering = props.filtering;

    const tableContainer = document.createElement("div");
    tableContainer.className = styles.tableContainer;
    tableContainer.innerHTML = `
      <div class="${styles.topContainer}" id="${this.hash}-top-container"></div>
      <table>
        ${this.tableHeader()}
        <tbody id="${this.hash}-table-body"></tbody>
      </table>
      <div class="${styles.bottomContainer}">
        <div class="${styles.paginationContainer}">
          <button class="${styles.paginationButton}" id="${this.hash}-prev-button" disabled>
            <svg width="12px" height="12px" viewBox="-4.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Previous</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-305.000000, -6679.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769" id="arrow_right-[#336]"> </path> </g> </g> </g> </g></svg>
          </button>
          <div class="${styles.paginationPagesContainer}" id="${this.hash}-pagination-pages"></div>
          <button class="${styles.paginationButton}" id="${this.hash}-next-button">
            <svg width="12px" height="12px" viewBox="-4.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Next</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-305.000000, -6679.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769" id="arrow_right-[#336]"> </path> </g> </g> </g> </g></svg>
          </button>
        </div>
        <span id="${this.hash}-pagination-text" class="${styles.paginationText}"></span>
      </div>
    `;

    this.prevButton = tableContainer.querySelector(
      `#${this.hash}-prev-button`
    ) as HTMLButtonElement;
    this.nextButton = tableContainer.querySelector(
      `#${this.hash}-next-button`
    ) as HTMLButtonElement;

    this.prevButton.addEventListener("click", () => {
      this.page = Math.max(0, this.page - 1);
      this.renderTableBody();
      this.renderPaginationText();
      this.renderPaginationPages();
      this.refreshButtonsDisabledState();
    });

    this.nextButton.addEventListener("click", () => {
      this.page = Math.min(
        Math.ceil(this.handledRows.length / PAGE_SIZE) - 1,
        this.page + 1
      );
      this.renderTableBody();
      this.renderPaginationText();
      this.renderPaginationPages();
      this.refreshButtonsDisabledState();
    });

    this.topContainer = tableContainer.querySelector(
      `#${this.hash}-top-container`
    ) as HTMLElement;
    this.tableBody = tableContainer.querySelector(
      `#${this.hash}-table-body`
    ) as HTMLElement;
    this.paginationText = tableContainer.querySelector(
      `#${this.hash}-pagination-text`
    ) as HTMLElement;
    this.paginationPagesContainer = tableContainer.querySelector(
      `#${this.hash}-pagination-pages`
    ) as HTMLElement;

    this.renderTopContainer();
    this.renderTableBody();
    this.renderPaginationText();
    this.renderPaginationPages();

    container.appendChild(tableContainer);
  }

  private refreshButtonsDisabledState(): void {
    if (this.prevButton) {
      this.prevButton.disabled = this.page === 0;
    }
    if (this.nextButton) {
      this.nextButton.disabled =
        this.page === Math.ceil(this.handledRows.length / PAGE_SIZE) - 1;
    }
  }
  private tableHeader(): string {
    const header = document.createElement("thead");
    header.className = styles.header;
    header.innerHTML = `
      <thead>
        <tr>
          ${this.headers.map((header) => `<th>${header}</th>`).join("")}
        </tr>
      </thead>
    `;
    return header.outerHTML;
  }

  private renderTopContainer(): void {
    if (!this.topContainer) return;
    this.topContainer.innerHTML = `
      <div class="${styles.searchContainer}">
        <svg class="${styles.searchIcon}" width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <input type="text" class="${styles.searchInput}" placeholder="${this.search.placeholder}" id="${this.hash}-search-input" />
      </div>

      <div class="${styles.rightContainer}">
        ${this.sorting ? `<div class="${styles.sortDropdown}" id="${this.hash}-sort-dropdown"></div>` : ""}
        ${this.filtering ? Object.keys(this.filtering.filters).map((filter) => `
          <div class="${styles.filtersContainer}" id="${this.hash}-${filter}-container"></div>
        `).join("") : ""}
      </div>
    `;

    const sortDropdown = this.topContainer.querySelector(
      `#${this.hash}-sort-dropdown`
    );

    if (sortDropdown && this.sorting) {
      this.sortDropdown.render(sortDropdown as HTMLElement, {
        options: this.sorting.options,
        icon: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M13 12H21M13 8H21M13 16H21M6 7V17M6 17L3 14M6 17L9 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,
        onChange: (option: string) => {
          if (this.sorting?.sortHandler) {
            this.sortValue = option;
            this.handledRows = this.getHandledRows();
            this.page = 0;
            this.renderTableBody();
            this.renderPaginationText();
            this.renderPaginationPages();
            this.refreshButtonsDisabledState();
          }
        },
      });
    }

    Object.keys(this.filtering?.filters ?? {}).forEach((filter) => {
      const filterContainer = this.topContainer!.querySelector(
        `#${this.hash}-${filter}-container`
      );
      if (filterContainer) {
        this.filterDropdowns[filter] = new Dropdown();
        this.filterDropdowns[filter].render(filterContainer as HTMLElement, {
          options: this.filtering?.filters[filter]?.options ?? [],
          icon: this.filtering?.filters[filter]?.icon,
          onChange: (option: string) => {
            this.filterValues[filter] = option;
            this.handledRows = this.getHandledRows();
            this.page = 0;
            this.renderTableBody();
            this.renderPaginationText();
            this.renderPaginationPages();
            this.refreshButtonsDisabledState();
          },
        });
      }
    });

    const searchInput = this.topContainer.querySelector(
      `#${this.hash}-search-input`
    ) as HTMLInputElement;

    searchInput.addEventListener("input", (e) => {
      const value = (e.target as HTMLInputElement).value;
      this.searchValue = value;
      this.handledRows = this.getHandledRows();
      this.page = 0;
      this.renderTableBody();
      this.renderPaginationText();
      this.renderPaginationPages();
      this.refreshButtonsDisabledState();
    });
  }

  private getHandledRows(): T[] {
    let handledRows = this.rawRows;
    if (this.searchValue) {
      handledRows = this.search.searchHandler(this.searchValue, handledRows);
    }
    if (this.sortValue && this.sorting) {
      handledRows = this.sorting.sortHandler(this.sortValue, handledRows);
    }
    if (this.filtering) {
      Object.entries(this.filterValues).forEach(([key, value]) => {
        if (value) {
          handledRows = this.filtering!.filterHandler(key as keyof T, value, handledRows);
        }
      });
    }
    return handledRows;
  }

  private renderTableBody(): void {
    if (!this.tableBody) return;
    this.tableBody.innerHTML = `
      ${this.handledRows
        .slice(this.page * PAGE_SIZE, (this.page + 1) * PAGE_SIZE)
        .map((row) => this.renderRow(row))
        .join("")}
    `;
  }

  private renderPaginationPages(): void {
    if (!this.paginationPagesContainer) return;
    const totalPages = Math.ceil(this.handledRows.length / PAGE_SIZE);
    const currentPage = this.page + 1; // Convert 0-based to 1-based

    if (totalPages < 1) {
      this.paginationPagesContainer.innerHTML = "";
      return;
    }

    const pages: (number | string)[] = [1];

    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    if (rangeStart > 2) {
      pages.push("...");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (rangeEnd < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    this.paginationPagesContainer.innerHTML = pages
      .map((page) => {
        if (page === "...") {
          return `<span class="${styles.ellipsis}">...</span>`;
        }
        const isActive = page === currentPage;
        return `<button class="${styles.pageButton} ${
          isActive ? styles.activePage : ""
        }" data-page="${page}">${page}</button>`;
      })
      .join("");

    // Add click listeners for page buttons
    this.paginationPagesContainer
      .querySelectorAll("[data-page]")
      .forEach((button) => {
        button.addEventListener("click", (e) => {
          const target = e.target as HTMLElement;
          const page = parseInt(target.getAttribute("data-page") || "1");
          this.page = page - 1; // Convert back to 0-based
          this.renderTableBody();
          this.renderPaginationText();
          this.renderPaginationPages();
          this.refreshButtonsDisabledState();
        });
      });
  }

  private renderPaginationText(): void {
    if (!this.paginationText) return;
    const start = this.page * PAGE_SIZE + 1;
    const end = Math.min((this.page + 1) * PAGE_SIZE, this.handledRows.length);
    this.paginationText.innerHTML = `Showing ${start} to ${end} of ${this.handledRows.length} entries`;
  }
}
