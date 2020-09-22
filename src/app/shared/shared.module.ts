import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StatisticsToSeasonPipe } from './pipes/statistics-to-season.pipe';
import { PlayerStatisticsToStatisticKeys } from './pipes/player-statistics-to-statistic-keys.pipe';
import { SortStatisticsPipe } from './pipes/sort-statistics.pipe';
import { SortMapByKeyAlphabeticallyPipe } from './pipes/sort-map-by-key-alphabetically.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StatisticsToSeasonPipe,
    PlayerStatisticsToStatisticKeys,
    SortStatisticsPipe,
    SortMapByKeyAlphabeticallyPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StatisticsToSeasonPipe,
    PlayerStatisticsToStatisticKeys,
    SortStatisticsPipe,
    SortMapByKeyAlphabeticallyPipe
  ]
})
export class SharedModule { }