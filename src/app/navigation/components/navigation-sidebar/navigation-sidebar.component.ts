import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrls: ['./navigation-sidebar.component.css']
})
export class NavigationSidebarComponent{
  title: string = 'Menu';

  @Output() sidebarClosed = new EventEmitter<void>();

  closeSidebar() {
    this.sidebarClosed.emit();
  }
}
