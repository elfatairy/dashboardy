import styles from "./Dropdown.module.css";
import { generateHash } from "../../../utils/helpers";

export type Option = {
  label: string;
  value: string;
  default?: boolean;
}

interface DropdownProps {
  options: Option[];
  icon?: string;
  onChange: (option: string) => void;
}

export class Dropdown {
  private hash: string = "";

  private dropdownShown: boolean = false;

  private dropdownButton: HTMLElement | null = null;

  options: Option[] = [];
  currentOption: Option | null = null;
  icon?: string;
  onChange?: (option: string) => void;

  constructor() {
    this.hash = generateHash();
  }

  render(container: HTMLElement, props: DropdownProps): void {
    this.options = props.options;
    this.currentOption = this.options.find((option) => option.default) || this.options[0];
    this.icon = props.icon;
    this.onChange = props.onChange;

    const dropdown = document.createElement("div");
    dropdown.className = styles.dropdown;
    dropdown.innerHTML = `
      <div class="${styles.dropdownButton}" id="${this.hash}-dropdown-button"></div>
      <div class="${styles.dropdownOptionsContainer}" id="${this.hash}-dropdown-options-container">
        <div class="${styles.dropdownOptionsBefore}" id="${this.hash}-dropdown-options-before"></div>
        <div class="${styles.dropdownOptions}" id="${this.hash}-dropdown-options">
          ${this.options.map((option) => `
            <div class="${styles.dropdownOption}" data-value="${option.value}">
              <span class="${styles.dropdownOptionLabel}">${option.label}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    this.dropdownButton = dropdown.querySelector(`#${this.hash}-dropdown-button`) as HTMLElement;
    const dropDownOptionsOverlay = dropdown.querySelector(`#${this.hash}-dropdown-options-container`) as HTMLElement;
    const dropDownOptionsBackground = dropdown.querySelector(`#${this.hash}-dropdown-options-before`) as HTMLElement;
    const dropDownOptions = dropDownOptionsOverlay.querySelectorAll(`.${styles.dropdownOption}`) as NodeListOf<HTMLElement>;
    
    this.dropdownButton.addEventListener("click", () => {
      this.dropdownShown = !this.dropdownShown;
      dropDownOptionsOverlay.classList.toggle(styles.show);
    });

    dropDownOptionsBackground.addEventListener("click", () => {
      this.dropdownShown = false;
      dropDownOptionsOverlay.classList.remove(styles.show);
    });

    dropDownOptions.forEach((optionItem) => {
      optionItem.addEventListener("click", () => {
        this.currentOption = this.options.find((option) => option.value === optionItem.dataset.value) || this.options[0];
        this.dropdownShown = false;
        this.onChange?.(this.currentOption.value);
        this.renderDropdownButton();
        dropDownOptionsOverlay.classList.remove(styles.show);
      });
    });

    this.renderDropdownButton();
    container.appendChild(dropdown);
  }

  private renderDropdownButton(): void {
    if (!this.dropdownButton) {
      return;
    }

    this.dropdownButton.innerHTML = !this.currentOption ? `
      <div class="${styles.placeholder}">Select an option</div>
    ` : `
      ${this.icon ?? ""}
      <span class="${styles.dropdownButtonLabel}">${this.currentOption.label}</span>
      <svg width="8px" height="8px" viewBox="-4.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" transform="rotate(90)"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g ><desc>Created with Sketch.</desc> <defs> </defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g transform="translate(-305.000000, -6679.000000)" fill="currentColor"> <g transform="translate(56.000000, 160.000000)"> <path d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"> </path> </g> </g> </g> </g></svg>
    `
  } 
}
