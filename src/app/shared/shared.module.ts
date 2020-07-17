import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StatisticsToSeasonPipe } from './pipes/statistics-to-season.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StatisticsToSeasonPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StatisticsToSeasonPipe
  ]
})
export class SharedModule { }