import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StatisticsToSeasonPipe } from './pipes/statistics-to-season.pipe';
import { PlayerStatisticsToStatisticKeys } from './pipes/player-statistics-to-statistic-keys.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StatisticsToSeasonPipe,
    PlayerStatisticsToStatisticKeys
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StatisticsToSeasonPipe,
    PlayerStatisticsToStatisticKeys
  ]
})
export class SharedModule { }