import styles from "./ExpensesGraph.module.css";
import { generateHash, getMonthName } from "../../../utils/helpers";
import { durationOptions } from "../../../utils/constants";
import { payrolls } from "../../../data/payrolls";
import { formatCurrency } from "../../../utils/helpers";
import { LineGraph } from "../../ui/LineGraph/LineGraph";

interface ExpensesGraphProps {
  period: string;
}

export class ExpensesGraph {
  private hash: string = "";
  leftContent: Element | null = null;
  lineGraphContainer: HTMLElement | null = null;
  period: string = "30-days";

  private lineGraph: LineGraph = new LineGraph();

  constructor() {
    this.hash = generateHash();
  }
  
  render(container: HTMLElement, props: ExpensesGraphProps): void {
    this.period = props.period ?? "30-days";

    const block = document.createElement("div");
    block.className = styles.block;
    block.innerHTML = `
      <div class="${styles.blockHeader}">
        <div class="${styles.blockHeaderLeft}">
          <svg width="0.75rem" height="0.75rem" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-graph-up" stroke="currentColor" stroke-width="0.8800000000000001"><g  stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g > <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z"></path> </g></svg>
          <h3 class="${styles.blockHeaderLeftTitle}">Payroll Expense Overview</h3>
        </div>
      </div>

      <div class="${styles.blockContent}">
        <div class="${styles.blockContentLeft}" id="${this.hash}-expenses-graph-left"></div>
        <div class="${styles.blockContentRight}" id="${this.hash}-expenses-graph"></div>
      </div>
    `;

    this.leftContent = block.querySelector(`#${this.hash}-expenses-graph-left`) as HTMLElement;
    this.lineGraphContainer = block.querySelector(`#${this.hash}-expenses-graph`) as HTMLElement;
    
    this.renderContent();
    this.renderGraph();

    container.appendChild(block);
  }

  private renderGraph(): void {
    if (!this.lineGraphContainer) return;

    const data = [];

    switch (this.period) {
      case "30-days": {
        for (let i = 3; i >= 0; i--) {
          const month = new Date().getMonth() - i < 0 ? 12 + new Date().getMonth() - i : new Date().getMonth() - i;
          const year = new Date().getMonth() - i < 0 ? new Date().getFullYear() - 1 : new Date().getFullYear();

          const totalExpenses = payrolls.filter(payroll => 
            new Date(payroll.processedDate).getMonth() === month &&
            new Date(payroll.processedDate).getFullYear() === year
          ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);

          data.push({
            value: totalExpenses,
            label: getMonthName(month)
          });
        }
        break;
      }
      case "3-months": {
        for (let i = 3; i >= 0; i--) {
          let quarter = Math.floor(new Date().getMonth() / 3) - i;
          let year = new Date().getFullYear();
          if (quarter < 0) {
            quarter += 4;
            year -= 1;
          }

          const totalExpenses = payrolls.filter(payroll => 
            Math.floor(new Date(payroll.processedDate).getMonth() / 3) === quarter &&
            new Date(payroll.processedDate).getFullYear() === year
          ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);
          
          data.push({
            value: totalExpenses,
            label: `Q${quarter + 1} ${year}`
          });
        }
        break;
      }
      case "6-months": {
        for (let i = 3; i >= 0; i--) {
          let halfYear = Math.floor(new Date().getMonth() / 6) - i;
          let year = new Date().getFullYear();
          while (halfYear < 0) {
            halfYear += 2;
            year -= 1;
          }

          const totalExpenses = payrolls.filter(payroll => 
            Math.floor(new Date(payroll.processedDate).getMonth() / 6) === halfYear &&
            new Date(payroll.processedDate).getFullYear() === year
          ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);
          
          data.push({
            value: totalExpenses,
            label: `H${halfYear + 1} ${year}`
          });
        }
        break;
      }
      case "1-year": {
        for (let i = 4; i >= 0; i--) {
          const year = new Date().getFullYear() - i;

          const totalExpenses = payrolls.filter(payroll => 
            new Date(payroll.processedDate).getFullYear() === year
          ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);

          data.push({
            value: totalExpenses,
            label: year.toString()
          });
        }
        break;
      }
    }

    this.lineGraphContainer.innerHTML = "";
    this.lineGraph.render(this.lineGraphContainer, { data });
  }

  private renderContent(): void {
    if (!this.leftContent) return;

    const duration = durationOptions.find(option => option.tag === this.period);
    if (!duration) return;

    let totalExpenses = 0;
    let previousTotalExpenses = 0;
    let percentage = 0;
    switch (duration.tag) {
      case "30-days": {
        totalExpenses = payrolls.filter(payroll => 
          new Date(payroll.processedDate).getMonth() === new Date().getMonth() &&
          new Date(payroll.processedDate).getFullYear() === new Date().getFullYear()
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);

        const previousMonth = new Date().getMonth() === 0 ? 11 : new Date().getMonth() - 1;
        const previousYear = new Date().getMonth() === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear();
        previousTotalExpenses = payrolls.filter(payroll => 
          new Date(payroll.processedDate).getMonth() === previousMonth &&
          new Date(payroll.processedDate).getFullYear() === previousYear
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);
        break;
      }
      case "3-months": {
        const currentQuarter = Math.floor(new Date().getMonth() / 3);

        totalExpenses = payrolls.filter(payroll => 
          Math.floor(new Date(payroll.processedDate).getMonth() / 3) === currentQuarter &&
          new Date(payroll.processedDate).getFullYear() === new Date().getFullYear()
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);

        const previousQuarter = currentQuarter === 0 ? 3 : currentQuarter - 1;
        const previousYear = currentQuarter === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear();
        previousTotalExpenses = payrolls.filter(payroll => 
          Math.floor(new Date(payroll.processedDate).getMonth() / 3) === previousQuarter &&
          new Date(payroll.processedDate).getFullYear() === previousYear
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);
        break;
      }
      case "6-months": {
        const currentHalfYear = Math.floor(new Date().getMonth() / 6);
        
        totalExpenses = payrolls.filter(payroll => 
          Math.floor(new Date(payroll.processedDate).getMonth() / 6) === currentHalfYear &&
          new Date(payroll.processedDate).getFullYear() === new Date().getFullYear()
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);

        const previousHalfYear = currentHalfYear === 0 ? 1 : currentHalfYear - 1;
        const previousYear = currentHalfYear === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear();
        previousTotalExpenses = payrolls.filter(payroll => 
          Math.floor(new Date(payroll.processedDate).getMonth() / 6) === previousHalfYear &&
          new Date(payroll.processedDate).getFullYear() === previousYear
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);
        break;
      }
      case "1-year": {
        totalExpenses = payrolls.filter(payroll => 
          new Date(payroll.processedDate).getFullYear() === new Date().getFullYear()
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);
        
        const previousYear = new Date().getFullYear() - 1;
        previousTotalExpenses = payrolls.filter(payroll => 
          new Date(payroll.processedDate).getFullYear() === previousYear
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);
        break;
      }
    }
    percentage = (totalExpenses - previousTotalExpenses) / previousTotalExpenses * 100;

    this.leftContent.innerHTML = `
      <div class="${styles.blockContentLeftContent}">
        <span class="${styles.totalExpenses}" data-testid="total-expenses">${formatCurrency(totalExpenses)}</span>
        <span class="${styles.comparsionText}">
          <span class="${styles.comparsionTextValue}" data-direction="${percentage > 0 ? "up" : "down"}">
            ${
              percentage > 0 ? `
                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                ` : `
                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)"><g  stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              `
            }
            ${Math.abs(percentage).toFixed(2)}%
          </span>
          <span class="${styles.comparsionPeriod}">Last ${durationOptions.find(option => option.tag === this.period)?.label}</span>
        </span>
      </div>
    `
  }

  updatePeriod(period: string): void {
    this.period = period;
    this.renderContent();
    this.renderGraph();
  }
}
