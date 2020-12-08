import { NgModule } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SharedModule } from '../shared/shared.module';
import { NavigationShellComponent } from './containers/navigation-shell/navigation-shell.component';
import { NavigationRoutingModule } from './navigation-routing.module';

@NgModule({
  declarations: [
    NavigationBarComponent,
    NavigationShellComponent,
    SidebarComponent
  ],
  imports: [
    SharedModule,
    NavigationRoutingModule
  ],
  exports: [NavigationShellComponent]
})
export class NavigationModule { }
