import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PlayersShellComponent } from './containers/players-shell/players-shell.component';

const playersRoutes: Routes = [
  { path: '', component: PlayersShellComponent }
]

@NgModule({
  declarations: [
    PlayersShellComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(playersRoutes),
  ]
})
export class PlayersModule { }