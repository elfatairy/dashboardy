import styles from "./Navbar.module.css";
import profilePic from "../../../assets/images/profile-pic.jpg";
import { icons, navItems } from "../../utils/constants";
import { formatCurrency, generateHash } from "../../utils/helpers";
import { getProjectById, projects } from "../../data/projects";
import { SearchOverlay, SearchResultItem } from "../SearchOverlay/SearchOverlay";
import { employees, getEmployeeById } from "../../data/employees";
import { departments, getDepartmentById } from "../../data/departments";
import { tasks } from "../../data/tasks";
import { payrolls } from "../../data/payrolls";

export class Navbar {
  private hash: string = "";

  private searchOverlay: SearchOverlay = new SearchOverlay();

  constructor() {
    this.hash = generateHash();
  }

  render(container: HTMLElement): void {
    const navbarPlaceholder = document.createElement("div");
    navbarPlaceholder.className = styles.navbarPlaceholder;
    const navbar = document.createElement("div");
    navbar.className = styles.navbar;
    navbar.innerHTML = `
      <div class="${styles.header}">
        <div class="${styles.headerLeft}">
          <svg width="30px" height="30px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <h1 class="${styles.title}">Dashboardy</h1>
        </div>
      </div>

      <button class="${styles.searchContainer}">
        <div class="${styles.searchInputContainer}">
          <span class="${styles.searchInput}" role="search">Search Anything...</span>
          <svg class="${styles.searchIcon}" width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <div class="${styles.commandKContainer}">
            <svg width="12px" height="12px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><title>Command</title><path d="M10 10V7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10H10ZM10 10V14M10 10H14M10 14V17C10 18.6569 8.65685 20 7 20C5.34315 20 4 18.6569 4 17C4 15.3431 5.34315 14 7 14H10ZM10 14H14M14 10H17C18.6569 10 20 8.65685 20 7C20 5.34315 18.6569 4 17 4C15.3431 4 14 5.34315 14 7V10ZM14 10V14M14 14H17C18.6569 14 20 15.3431 20 17C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17V14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="${styles.commandKText}">K</span>
          </div>
        </div>
      </button>
      
      <div class="${styles.contents}">
        <ul class="${styles.menu}" role="menu">
          ${navItems.map((item) => {
            const isActive = window.location.pathname === item.href;
            return `
              <a
                href="${item.href}" 
                onclick="event.preventDefault(); this.closest('.${styles.navbar}').navButtonClickHandler('${item.href}'); return false;" 
                class="${styles.menuItem}" 
                data-active="${isActive}"
                data-item-name="${item.name}"
                role="menuitem"
                ${isActive ? 'aria-current="page"' : ''}
              >
                <span class="${styles.menuItemIcon}">${item.icon}</span>
                <span class="${styles.menuItemText}">${item.name}</span>
              </a>
            `
          }).join('')}
        </ul>

        <div class="${styles.collapseMenu}" data-open="${true}">
          <button class="${styles.collapseMenuHeader}">
            <svg class="${styles.collapseMenuToggleIcon}" width="10px" height="10px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"></path> </g></svg>
            <span class="${styles.collapseMenuHeaderText}">PROJECTS</span>
          </button>

          <ul class="${styles.collapseMenuItems}">
            ${projects.filter(project => project.currentStatus === "In Progress" || project.currentStatus === "Overdue").map((project) => {
              const isActive = window.location.pathname === `/projects/${project.id}`;
              return `
                <li>
                  <a 
                    href="/projects/${project.id}" 
                    onclick="event.preventDefault(); this.closest('.${styles.navbar}').navButtonClickHandler('/projects/${project.id}'); return false;" 
                    class="${styles.collapseMenuItem}" 
                    data-active="${isActive}"
                    ${isActive ? 'aria-current="page"' : ''}
                  >
                    ${icons.project}
                    <span class="${styles.collapseMenuItemText}">${project.name}</span>
                  </a>
                </li>
              `
            }).join('')}
          </ul>
        </div>
      </div>

      <div class="${styles.user}">
        <img src="${profilePic}" class="${styles.userImage}" width="36px" height="36px" />
        <div class="${styles.userInfo}">
          <span class="${styles.userName}">Omar Hassan</span>
          <span class="${styles.userEmail}">elfatairy@omarhassan.net</span>
        </div>
        <button class="${styles.userLogoutButton}" title="Logout">
          <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
    `;
    
    const navbarElement = navbar as any;
    navbarElement.navButtonClickHandler = this.navButtonClickHandler.bind(this);
    
    const searchContainer = navbarElement.querySelector(`.${styles.searchContainer}`) as HTMLElement;
    searchContainer.addEventListener('click', () => {
      this.searchOverlay.show();
    });
    document.addEventListener('keydown', (e) => {
      if (
        (e.ctrlKey && (e.key === 'k' || e.key === 'K')) ||
        (e.metaKey && (e.key === 'k' || e.key === 'K'))
      ) {
        e.preventDefault();
        this.searchOverlay.show();
      }
    });

    const collapseMenus = navbarElement.querySelectorAll(`.${styles.collapseMenu}`) as NodeListOf<HTMLElement>;
    collapseMenus.forEach((collapseMenu) => {
      collapseMenu.querySelector(`.${styles.collapseMenuHeader}`)?.addEventListener('click', () => {
        const isOpen = collapseMenu.getAttribute('data-open') === 'true';
        collapseMenu.setAttribute('data-open', (!isOpen).toString());
      });
    });

    const searchOverlayContainer = document.createElement("div");
    this.searchOverlay.render(searchOverlayContainer, {
      onSearch: (query: string) => {
        const results: SearchResultItem[] = [];
        projects.filter(project => (
          project.id.toString().includes(query) || 
          project.name.toLowerCase().includes(query.toLowerCase())
        )).map(project => {
          results.push({
            href: `/projects/${project.id}`,
            icon: icons.project,
            title: project.name
          });
        });
        tasks.filter(task => (
          task.id.toString().includes(query) || 
          task.name.toLowerCase().includes(query.toLowerCase())
        )).map(task => {
          results.push({
            href: `/tasks?search=${query}`,
            icon: icons.tasks,
            title: task.name
          });
        });
        departments.filter(department => (
          department.id.toString().includes(query) || 
          department.name.toLowerCase().includes(query.toLowerCase()) ||
          department.code.toLowerCase().includes(query.toLowerCase())
        )).map(department => {
          results.push({
            href: `/departments?search=${query}`,
            icon: icons.departments,
            title: department.name
          });
        });
        employees.filter(employee => (
          employee.id.toString().includes(query) || 
          employee.name.toLowerCase().includes(query.toLowerCase()) ||
          employee.phone.toString().includes(query) ||
          employee.currentSalary.toString().includes(query) ||
          employee.role.toLowerCase().includes(query.toLowerCase())
        )).map(employee => {
          results.push({
            href: `/employees?search=${query}`,
            icon: icons.employees,
            title: employee.name
          });
        });
        return results;
      }
    });
    
    container.appendChild(navbarPlaceholder);
    container.appendChild(navbar);
    container.appendChild(searchOverlayContainer);

    window.addEventListener('popstate', this.handlePopState.bind(this));
    
    // Listen for spa-navigate events to update active item
    window.addEventListener('spa-navigate', ((event: CustomEvent) => {
      this.updateActiveItem(event.detail.href);
    }) as EventListener);
  }

  private navButtonClickHandler(href: string): void {
    history.pushState(null, '', href);
    
    window.dispatchEvent(new CustomEvent('spa-navigate', { detail: { href } }));
  }

  private handlePopState(event: PopStateEvent): void {
    window.dispatchEvent(new CustomEvent('spa-navigate', { 
      detail: { href: window.location.pathname } 
    }));
  }

  private updateActiveItem(href: string): void {
    // Remove active state from current active item
    const currentActiveItem = document.querySelector(`[data-active="true"]`);
    if (currentActiveItem) {
      currentActiveItem.setAttribute('data-active', 'false');
      currentActiveItem.removeAttribute('aria-current');
    }
    
    // Find the new active item by matching href with navItems
    const newActiveNavItem = navItems.find(item => item.href === href);
    if (newActiveNavItem) {
      const newActiveElement = document.querySelector(`.${styles.menuItem}[data-item-name="${newActiveNavItem.name}"]`);
      if (newActiveElement) {
        newActiveElement.setAttribute('data-active', 'true');
        newActiveElement.setAttribute('aria-current', 'page');
      }
    }
  }
}
