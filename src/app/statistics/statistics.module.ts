import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StatisticsEffects } from './state/statistic.effects';

import { StatisticsService } from './statistics.service';
import { StatisticsShellComponent } from './containers/statistics-shell/statistics-shell.component';
import { StatisticsSelectorComponent } from './components/statistics-selector/statistics-selector.component';
import { StatisticsTableComponent } from './components/statistics-table/statistics-table.component';

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
    RouterModule.forChild(statisticsRoutes),
    StoreModule.forFeature('statistics', {}),
    EffectsModule.forFeature([StatisticsEffects]),
  ],
  providers: [
    {
      provide: 'IStatisticsService',
      useClass: StatisticsService
    }
  ]
})
export class StatisticsModule { }