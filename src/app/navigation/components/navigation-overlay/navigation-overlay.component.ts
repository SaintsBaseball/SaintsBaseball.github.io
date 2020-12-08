import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'navigation-overlay',
  templateUrl: './navigation-overlay.component.html',
  styleUrls: ['./navigation-overlay.component.css']
})
export class NavigationOverlayComponent {
  @Output() sidebarClosed = new EventEmitter<void>();

  closeSidebar() {
    this.sidebarClosed.emit();
  }
}
