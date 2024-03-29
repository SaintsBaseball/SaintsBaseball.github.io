import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/statistic.reducer';

import { StatisticsShellComponent } from './containers/statistics-shell/statistics-shell.component';
import { StatisticsSelectorComponent } from './components/statistics-selector/statistics-selector.component';
import { StatisticsTableComponent } from './components/statistics-table/statistics-table.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

const statisticsRoutes: Routes = [
  { path: '', component: StatisticsShellComponent }
]

@NgModule({
  declarations: [
    StatisticsShellComponent,
    StatisticsSelectorComponent,
    StatisticsTableComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild(statisticsRoutes),
    StoreModule.forFeature('statistics', reducer),
    EffectsModule.forFeature([]),
  ]
})
export class StatisticsModule { }