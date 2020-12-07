import { NgModule } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavigationBarComponent, 
    SidebarComponent
  ],
  exports: [NavigationBarComponent],
  imports: [SharedModule]
})
export class NavigationModule { }
