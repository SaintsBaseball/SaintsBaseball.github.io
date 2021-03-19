import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlayerHittingStatistics } from 'src/app/classes/player-hitting-statistics';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';

@Component({
  selector: 'statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnChanges {
  @Input() playerHittingStatistics: PlayerHittingStatisticsDatabaseTable;
  @Input() currentSeason: string;
  @Input() selectedStatistic: string;
  @Output() selectedStatisticChanged = new EventEmitter<string>();
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<PlayerHittingStatistics[]>;
  private statisticClickCount: number = 0;

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.playerHittingStatistics[this.currentSeason]);
    this.dataSource.sort = this.sort;
  }

  changeSelectedStatistic(statisticKey: string): void {
    if (statisticKey === this.selectedStatistic) {
      this.statisticClickCount++;
    } else {
      this.statisticClickCount = 1;
    }

    if (this.statisticClickCount % 3 === 0) {
      this.selectedStatisticChanged.emit('');
    } else {
      this.selectedStatisticChanged.emit(statisticKey);
    }
  }

  determineInitialSortOrderForStatistic(statisticKey: string): SortDirection {
    if (statisticKey === '#' || statisticKey === 'Player') {
      return 'asc';
    }

    return 'desc';
  }
}
