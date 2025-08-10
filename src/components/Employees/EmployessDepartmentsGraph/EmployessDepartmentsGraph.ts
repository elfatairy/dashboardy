import styles from "./EmployeesDepartmentsGraph.module.css";
import { generateHash } from "../../../utils/helpers";
import { BarGraph } from "../../ui/BarGraph/BarGraph";
import { departments } from "../../../data/departments";
import { employees } from "../../../data/employees";
import { ToolTip } from "../../ui/ToolTip/ToolTip";

export class EmployeesDepartmentsGraph {
  private hash: string = "";
  graph: HTMLElement | null = null;

  private barGraph: BarGraph = new BarGraph();
  private toolTip: ToolTip = new ToolTip();

  constructor() {
    this.hash = generateHash();
  }
  
  render(container: HTMLElement): void {
    const block = document.createElement("div");
    block.className = styles.blockContainer;
    block.innerHTML = `
      <div class="${styles.block}">
        <div class="${styles.blockHeader}">
          <div class="${styles.blockHeaderLeft}">
            <svg width="0.75rem" height="0.75rem" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><g stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g > <desc>Created with Sketch.</desc> <defs> </defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g transform="translate(-419.000000, -800.000000)" fill="currentColor"> <g transform="translate(56.000000, 160.000000)"> <path d="M374.55,657 C374.55,657.552 374.0796,658 373.5,658 C372.9204,658 372.45,657.552 372.45,657 L372.45,643 C372.45,642.448 372.9204,642 373.5,642 C374.0796,642 374.55,642.448 374.55,643 L374.55,657 Z M374.55,640 L372.45,640 C371.28975,640 370.35,640.895 370.35,642 L370.35,658 C370.35,659.105 371.28975,660 372.45,660 L374.55,660 C375.71025,660 376.65,659.105 376.65,658 L376.65,642 C376.65,640.895 375.71025,640 374.55,640 L374.55,640 Z M367.2,657 C367.2,657.552 366.7296,658 366.15,658 C365.5704,658 365.1,657.552 365.1,657 L365.1,647 C365.1,646.448 365.5704,646 366.15,646 C366.7296,646 367.2,646.448 367.2,647 L367.2,657 Z M367.2,644 L365.1,644 C363.93975,644 363,644.895 363,646 L363,658 C363,659.105 363.93975,660 365.1,660 L367.2,660 C368.36025,660 369.3,659.105 369.3,658 L369.3,646 C369.3,644.895 368.36025,644 367.2,644 L367.2,644 Z M381.9,657 C381.9,657.552 381.4296,658 380.85,658 C380.2704,658 379.8,657.552 379.8,657 L379.8,653 C379.8,652.448 380.2704,652 380.85,652 C381.4296,652 381.9,652.448 381.9,653 L381.9,657 Z M381.9,650 L379.8,650 C378.63975,650 377.7,650.895 377.7,652 L377.7,658 C377.7,659.105 378.63975,660 379.8,660 L381.9,660 C383.06025,660 384,659.105 384,658 L384,652 C384,650.895 383.06025,650 381.9,650 L381.9,650 Z" > </path> </g> </g> </g> </g></svg>
            <div class="${styles.blockHeaderLeftTitle}">Employees / Department</div>
          </div>
        </div>

        <div class="${styles.graph}" id="${this.hash}-graph"></div>
      </div>

      <div class="${styles.toolTip}" id="${this.hash}-tool-tip"></div>
    `;

    this.graph = block.querySelector(`#${this.hash}-graph`) as HTMLElement;
    this.toolTip.render(block.querySelector(`#${this.hash}-tool-tip`) as HTMLElement);
    
    this.renderGraph();

    container.appendChild(block);
  }

  private renderGraph(): void {
    if (!this.graph) return;

    const data = departments.map((department) => ({
      label: department.name,
      values: [{
        value: employees.filter((employee) => employee.departmentId === department.id).length,
        color: "#2980b9"
      }]
    }));

    this.barGraph.render(this.graph, { 
      data, 
      labelBlackenedBehaviour: 'on-hover',
      width: 40,
      onHover: (dataItem, position) => {
        const toolTipContent = document.createElement("div");
        toolTipContent.className = styles.toolTipContent;
        toolTipContent.innerHTML = `
          <div class="${styles.toolTipContentDescription}">${dataItem.values[0].value} employee${dataItem.values[0].value > 1 ? "s" : ""}</div>
        `;

        this.toolTip.show(toolTipContent, {
          x: position.x - 10,
          y: window.innerHeight - position.y + 10,
        });
      },
      onLeave: () => {
        this.toolTip.hide();
      }
    });
  }
}
