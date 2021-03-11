import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';

@Component({
  selector: 'statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent {
  @Input() playerHittingStatistics: PlayerHittingStatisticsDatabaseTable;
  @Input() currentSeason: string;
  @Input() selectedStatistic: string;
  @Output() selectedStatisticChanged = new EventEmitter<string>();

  displayedColumns = ['#', 'Player', 'G', 'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'BB', 'SO', 'SB', 'CS', 'AVG', 'OBP', 'SLG', 'OPS', 'IBB', 'HBP', 'SAC', 'SF', 'TB', 'XBH', 'GDP', 'GO', 'AO', 'GO_AO', 'PA']

  keepOriginalOrder = (a) => a.key;

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
