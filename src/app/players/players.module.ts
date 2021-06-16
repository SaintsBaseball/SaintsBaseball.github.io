import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PlayersShellComponent } from './containers/players-shell/players-shell.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { MaterialModule } from '../material/material.module';
import { PlayersModalComponent } from './components/players-modal/players-modal.component';

const playersRoutes: Routes = [
  { path: '', component: PlayersShellComponent }
];

@NgModule({
  declarations: [
    PlayersShellComponent,
    PlayersListComponent,
    PlayersModalComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(playersRoutes),
    MaterialModule
  ]
})
export class PlayersModule { }
