import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StatisticsToSeasonPipe } from './pipes/statistics-to-season.pipe';
import { SortMapByKeyAlphabeticallyPipe } from './pipes/sort-map-by-key-alphabetically.pipe';
import { StatisticKeyToTooltipMessagePipe } from './pipes/statistic-key-to-tooltip-message.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StatisticsToSeasonPipe,
    SortMapByKeyAlphabeticallyPipe,
    StatisticKeyToTooltipMessagePipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StatisticsToSeasonPipe,
    SortMapByKeyAlphabeticallyPipe
  ]
})
export class SharedModule { }