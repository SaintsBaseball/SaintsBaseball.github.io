import { Component } from '@angular/core';

@Component({
  selector: 'navigation-shell',
  templateUrl: './navigation-shell.component.html'
})
export class NavigationShellComponent {
  sidebarIsOpen: boolean = false;

  openSidebar(): void {
    this.sidebarIsOpen = true;
  }

  closeSidebar() {
    this.sidebarIsOpen = false;
  }
}
