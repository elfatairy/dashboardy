import styles from "./ExpensesEarningsGraph.module.css";
import { generateHash, getMonthName } from "../../../utils/helpers";
import { durationOptions } from "../../../utils/constants";
import { payrolls } from "../../../data/payrolls";
import { earnings } from "../../../data/earnings";
import { BarGraph } from "../../ui/BarGraph/BarGraph";

const colors = {
  expenses: "#2980b9",
  earnings: "#c0392b"
}

interface ExpensesEarningsGraphProps {
  period: string;
}

export class ExpensesEarningsGraph {
  private hash: string = "";
  leftContent: Element | null = null;
  lineGraphContainer: HTMLElement | null = null;
  period: string = "30-days";

  private barGraph: BarGraph = new BarGraph();

  constructor() {
    this.hash = generateHash();
  }
  
  render(container: HTMLElement, props: ExpensesEarningsGraphProps): void {
    this.period = props.period ?? "30-days";

    const block = document.createElement("div");
    block.className = styles.block;
    block.innerHTML = `
      <div class="${styles.blockHeader}">
        <div class="${styles.blockHeaderLeft}">
          <svg width="0.75rem" height="0.75rem" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><g stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g > <desc>Created with Sketch.</desc> <defs> </defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g transform="translate(-419.000000, -800.000000)" fill="currentColor"> <g transform="translate(56.000000, 160.000000)"> <path d="M374.55,657 C374.55,657.552 374.0796,658 373.5,658 C372.9204,658 372.45,657.552 372.45,657 L372.45,643 C372.45,642.448 372.9204,642 373.5,642 C374.0796,642 374.55,642.448 374.55,643 L374.55,657 Z M374.55,640 L372.45,640 C371.28975,640 370.35,640.895 370.35,642 L370.35,658 C370.35,659.105 371.28975,660 372.45,660 L374.55,660 C375.71025,660 376.65,659.105 376.65,658 L376.65,642 C376.65,640.895 375.71025,640 374.55,640 L374.55,640 Z M367.2,657 C367.2,657.552 366.7296,658 366.15,658 C365.5704,658 365.1,657.552 365.1,657 L365.1,647 C365.1,646.448 365.5704,646 366.15,646 C366.7296,646 367.2,646.448 367.2,647 L367.2,657 Z M367.2,644 L365.1,644 C363.93975,644 363,644.895 363,646 L363,658 C363,659.105 363.93975,660 365.1,660 L367.2,660 C368.36025,660 369.3,659.105 369.3,658 L369.3,646 C369.3,644.895 368.36025,644 367.2,644 L367.2,644 Z M381.9,657 C381.9,657.552 381.4296,658 380.85,658 C380.2704,658 379.8,657.552 379.8,657 L379.8,653 C379.8,652.448 380.2704,652 380.85,652 C381.4296,652 381.9,652.448 381.9,653 L381.9,657 Z M381.9,650 L379.8,650 C378.63975,650 377.7,650.895 377.7,652 L377.7,658 C377.7,659.105 378.63975,660 379.8,660 L381.9,660 C383.06025,660 384,659.105 384,658 L384,652 C384,650.895 383.06025,650 381.9,650 L381.9,650 Z" > </path> </g> </g> </g> </g></svg>
          <div class="${styles.blockHeaderLeftTitle}">Payroll Expenses / Earnings</div>
        </div>

        <div class="${styles.blockHeaderRight}">
          <div class="${styles.blockHeaderRightItem}">
            <span class="${styles.blockHeaderRightItemPoint}" style="background-color: ${colors.earnings};"></span>
            <span class="${styles.blockHeaderRightItemLabel}">Earnings</span>
          </div>

          <div class="${styles.blockHeaderRightItem}">
            <span class="${styles.blockHeaderRightItemPoint}" style="background-color: ${colors.expenses};"></span>
            <span class="${styles.blockHeaderRightItemLabel}">Expenses</span>
          </div>
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

          const totalEarnings = earnings.filter(earning => 
            earning.month === month &&
            earning.year === year
          ).reduce((acc, earning) => acc + earning.earnings, 0);

          data.push({
            values: [
              {
                value: totalEarnings,
                color: colors.earnings
              },
              {
                value: totalExpenses,
                color: colors.expenses
              },
            ],
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

          const totalEarnings = earnings.filter(earning => 
            Math.floor(earning.month / 3) === quarter &&
            earning.year === year
          ).reduce((acc, earning) => acc + earning.earnings, 0);
          
          console.log("quarter", `Q${quarter + 1} ${year}`);
          console.log("totalExpenses", totalExpenses);
          console.log("totalEarnings", totalEarnings);


          data.push({
            values: [
              {
                value: totalEarnings,
                color: colors.earnings
              },
              {
                value: totalExpenses,
                color: colors.expenses
              },
            ],
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
          
          const totalEarnings = earnings.filter(earning => 
            Math.floor(earning.month / 6) === halfYear &&
            earning.year === year
          ).reduce((acc, earning) => acc + earning.earnings, 0);

          data.push({
            values: [
              {
                value: totalEarnings,
                color: colors.earnings
              },
              {
                value: totalExpenses,
                color: colors.expenses
              },
            ],
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

          const totalEarnings = earnings.filter(earning => 
            earning.year === year
          ).reduce((acc, earning) => acc + earning.earnings, 0);

          data.push({
            values: [
              {
                value: totalEarnings,
                color: colors.earnings
              },
              {
                value: totalExpenses,
                color: colors.expenses
              },
            ],
            label: year.toString()
          });
        }
        break;
      }
    }

    this.lineGraphContainer.innerHTML = "";
    this.barGraph.render(this.lineGraphContainer, { data });
  }

  private renderContent(): void {
    if (!this.leftContent) return;

    const duration = durationOptions.find(option => option.tag === this.period);
    if (!duration) return;

    let totalExpenses = 0;
    let totalEarnings = 0;
    let previousTotalExpenses = 0;
    let previousTotalEarnings = 0;
    let currentPercentage = 0;
    let previousPercentage = 0;

    switch (duration.tag) {
      case "30-days": {
        totalExpenses = payrolls.filter(payroll => 
          new Date(payroll.processedDate).getMonth() === new Date().getMonth() &&
          new Date(payroll.processedDate).getFullYear() === new Date().getFullYear()
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);

        totalEarnings = earnings.filter(earning => 
          earning.month === new Date().getMonth() &&
          earning.year === new Date().getFullYear()
        ).reduce((acc, earning) => acc + earning.earnings, 0);

        const previousMonth = new Date().getMonth() === 0 ? 11 : new Date().getMonth() - 1;
        const previousYear = new Date().getMonth() === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear();

        previousTotalExpenses = payrolls.filter(payroll => 
          new Date(payroll.processedDate).getMonth() === previousMonth &&
          new Date(payroll.processedDate).getFullYear() === previousYear
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);

        previousTotalEarnings = earnings.filter(earning => 
          earning.month === previousMonth &&
          earning.year === previousYear
        ).reduce((acc, earning) => acc + earning.earnings, 0);
        break;
      }
      case "3-months": {
        const currentQuarter = Math.floor(new Date().getMonth() / 3);

        totalExpenses = payrolls.filter(payroll => 
          Math.floor(new Date(payroll.processedDate).getMonth() / 3) === currentQuarter &&
          new Date(payroll.processedDate).getFullYear() === new Date().getFullYear()
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);

        totalEarnings = earnings.filter(earning => 
          earning.month / 3 === currentQuarter &&
          earning.year === new Date().getFullYear()
        ).reduce((acc, earning) => acc + earning.earnings, 0);

        const previousQuarter = currentQuarter === 0 ? 3 : currentQuarter - 1;
        const previousYear = currentQuarter === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear();
        previousTotalExpenses = payrolls.filter(payroll => 
          Math.floor(new Date(payroll.processedDate).getMonth() / 3) === previousQuarter &&
          new Date(payroll.processedDate).getFullYear() === previousYear
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);

        previousTotalEarnings = earnings.filter(earning => 
          earning.month / 3 === previousQuarter &&
          earning.year === previousYear
        ).reduce((acc, earning) => acc + earning.earnings, 0);
        break;
      }
      case "6-months": {
        const currentHalfYear = Math.floor(new Date().getMonth() / 6);
        
        totalExpenses = payrolls.filter(payroll => 
          Math.floor(new Date(payroll.processedDate).getMonth() / 6) === currentHalfYear &&
          new Date(payroll.processedDate).getFullYear() === new Date().getFullYear()
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);

        totalEarnings = earnings.filter(earning => 
          Math.floor(earning.month / 6) === currentHalfYear &&
          earning.year === new Date().getFullYear()
        ).reduce((acc, earning) => acc + earning.earnings, 0);

        const previousHalfYear = currentHalfYear === 0 ? 1 : currentHalfYear - 1;
        const previousYear = currentHalfYear === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear();
        previousTotalExpenses = payrolls.filter(payroll => 
          Math.floor(new Date(payroll.processedDate).getMonth() / 6) === previousHalfYear &&
          new Date(payroll.processedDate).getFullYear() === previousYear
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);

        previousTotalEarnings = earnings.filter(earning => 
          Math.floor(earning.month / 6) === previousHalfYear &&
          earning.year === previousYear
        ).reduce((acc, earning) => acc + earning.earnings, 0);
        break;
      }
      case "1-year": {
        totalExpenses = payrolls.filter(payroll => 
          new Date(payroll.processedDate).getFullYear() === new Date().getFullYear()
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);

        totalEarnings = earnings.filter(earning => 
          earning.year === new Date().getFullYear()
        ).reduce((acc, earning) => acc + earning.earnings, 0);
        
        const previousYear = new Date().getFullYear() - 1;
        previousTotalExpenses = payrolls.filter(payroll => 
          new Date(payroll.processedDate).getFullYear() === previousYear
        ).reduce((acc, payroll) => acc + payroll.totalAmount, 0);

        previousTotalEarnings = earnings.filter(earning => 
          earning.year === previousYear
        ).reduce((acc, earning) => acc + earning.earnings, 0);
        break;
      }
    }
    currentPercentage = totalExpenses / totalEarnings * 100;
    previousPercentage = previousTotalExpenses / previousTotalEarnings * 100;
    const percentage = currentPercentage - previousPercentage;

    console.log("totalExpenses", totalExpenses);
    console.log("totalEarnings", totalEarnings);
    console.log("previousTotalExpenses", previousTotalExpenses);
    console.log("previousTotalEarnings", previousTotalEarnings);

    this.leftContent.innerHTML = `
      <div class="${styles.blockContentLeftContent}">
        <span class="${styles.totalExpenses}">${currentPercentage.toFixed(2)}%</span>
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
