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
import { StatisticsKeyTableComponent } from './components/statistics-key-table/statistics-key-table.component';

const statisticsRoutes: Routes = [
  { path: '', component: StatisticsShellComponent }
]

@NgModule({
  declarations: [
    StatisticsShellComponent,
    StatisticsSelectorComponent,
    StatisticsTableComponent,
    StatisticsKeyTableComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(statisticsRoutes),
    StoreModule.forFeature('statistics', reducer),
    EffectsModule.forFeature([]),
  ],
  providers: []
})
export class StatisticsModule { }