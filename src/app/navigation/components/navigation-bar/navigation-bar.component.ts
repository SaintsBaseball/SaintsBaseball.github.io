import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  linkToHomepageText: string = 'Saints';
  @Output() sidebarOpened = new EventEmitter<void>();
  
  openSidebar() {
    this.sidebarOpened.emit();
  }
}
