import {Component, Input} from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{
  title: string = 'Menu';

  @Input() closeSidebar: Function = () => {};
}
