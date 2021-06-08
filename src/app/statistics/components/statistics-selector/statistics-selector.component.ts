import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';

@Component({
  selector: 'statistics-selector',
  templateUrl: './statistics-selector.component.html',
  styleUrls: ['./statistics-selector.component.css']
})
export class StatisticsSelectorComponent {
  @Input() playerHittingStatistics: PlayerHittingStatisticsDatabaseTable;
  @Input() currentSeason: string;
  @Output() seasonChanged = new EventEmitter<string>();
  selectedStatisticsGroup = new FormControl('standard');

  changeSeason(seasonName: string): void {
    this.seasonChanged.emit(seasonName);
  }
}
