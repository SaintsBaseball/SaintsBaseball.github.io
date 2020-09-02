import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';

@Component({
  selector: 'statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent {
  @Input() statistics: PlayerHittingStatisticsDatabaseTable;
  @Input() currentSeason: string;
  @Input() selectedStatistic: string;
  @Output() selectedStatisticChanged = new EventEmitter<string>();
  
  public keepOriginalOrder = (a) => a.key;

  changeSelectedStatistic(statisticKey: string): void {
    if (statisticKey === this.selectedStatistic) {
      statisticKey += 'Reverse';
    }
    this.selectedStatisticChanged.emit(statisticKey);
  }

  determineIfStatisticIsSelected(statisticName: string): boolean {
    const selectedStatisticName = this.selectedStatistic.replace('Reverse', '');
    return selectedStatisticName === statisticName;
  }
}
