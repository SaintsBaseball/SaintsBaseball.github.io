import { Component, Input } from '@angular/core';
import { StatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';

@Component({
  selector: 'statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent {
  @Input() statistics: StatisticsDatabaseTable;
  @Input() currentSeason: string;
  selectedStatistic: string = '#';
  
  public keepOriginalOrder = (a) => a.key;

  changeSelectedStat(statisticKey: string) {
    this.selectedStatistic = statisticKey;
  }
}
