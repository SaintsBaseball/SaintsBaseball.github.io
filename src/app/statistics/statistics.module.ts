import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StatisticsTableComponent } from './components/statistics-table/statistics-table.component';
import { StatisticsService } from './statistics.service';

const statisticsRoutes: Routes = [
  { path: '', component: StatisticsTableComponent }
]

@NgModule({
  declarations: [
    StatisticsTableComponent,
  ],
  imports: [
    RouterModule.forChild(statisticsRoutes),
    StoreModule.forFeature('statistics', {}),
    EffectsModule.forFeature([]),
  ],
  providers: [
    {
      provide: 'IStatisticsService',
      useClass: StatisticsService
    }
  ]
})
export class StatisticsModule { }