import { NgModule } from '@angular/core';
import { NavigationSidebarComponent } from './components/navigation-sidebar/navigation-sidebar.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SharedModule } from '../shared/shared.module';
import { NavigationShellComponent } from './containers/navigation-shell/navigation-shell.component';
import { NavigationRoutingModule } from './navigation-routing.module';
import { NavigationOverlayComponent } from './components/navigation-overlay/navigation-overlay.component';

@NgModule({
  declarations: [
    NavigationBarComponent,
    NavigationShellComponent,
    NavigationSidebarComponent,
    NavigationOverlayComponent
  ],
  imports: [
    SharedModule,
    NavigationRoutingModule
  ],
  exports: [NavigationShellComponent]
})
export class NavigationModule { }
