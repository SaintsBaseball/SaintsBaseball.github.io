import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PlayersShellComponent } from './containers/players-shell/players-shell.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { MaterialModule } from '../material/material.module';

const playersRoutes: Routes = [
  { path: '', component: PlayersShellComponent }
];

@NgModule({
  declarations: [
    PlayersShellComponent,
    PlayersListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(playersRoutes),
    MaterialModule
  ]
})
export class PlayersModule { }
