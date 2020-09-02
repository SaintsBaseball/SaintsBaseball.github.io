import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';

@Component({
  selector: 'statistics-selector',
  templateUrl: './statistics-selector.component.html',
  styleUrls: ['./statistics-selector.component.css']
})
export class StatisticsSelectorComponent {
  @Input() statistics: PlayerHittingStatisticsDatabaseTable;
  @Input() currentSeason: string;
  @Output() seasonChanged = new EventEmitter<string>();

  changeSeason(seasonName: string): void {
    this.seasonChanged.emit(seasonName);
  }
}
