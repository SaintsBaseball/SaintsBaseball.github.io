import { Component, Input, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlayerHittingStatistics } from 'src/app/classes/player-hitting-statistics';
import { StatisticGroup } from 'src/app/types/statistic-group';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import { BaseballSeason } from 'src/app/types/baseball-season';
import { statisticGroupToStatisticColumns } from 'src/app/constants/statistic-group-to-statistic-columns';
import { PlayerPitchingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-pitching-statistics-database-table';
import { StatisticType } from 'src/app/types/statistic-type';

@Component({
  selector: 'statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnChanges, AfterViewInit {
  @Input() playerHittingStatistics: PlayerHittingStatisticsDatabaseTable;
  @Input() playerPitchingStatistics: PlayerPitchingStatisticsDatabaseTable;
  @Input() currentSeason: BaseballSeason;
  @Input() selectedStatistic: string;
  @Input() selectedStatisticsGroup: StatisticGroup;
  @Input() selectedStatisticsType: StatisticType;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<PlayerHittingStatistics[]> = new MatTableDataSource<PlayerHittingStatistics[]>();
  displayedColumns: string[] = [];

  ngOnChanges(): void {
    const statisticsToShow = this.selectedStatisticsType === 'hitting' ? this.playerHittingStatistics : this.playerPitchingStatistics
    this.dataSource.data = statisticsToShow[this.currentSeason] ?? [];

    if (this.dataSource.data.length > 0) {
      const key = `${this.selectedStatisticsType}-${this.selectedStatisticsGroup}`;
      this.displayedColumns = statisticGroupToStatisticColumns[key];
    } else {
      this.displayedColumns = [];
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  determineInitialSortOrderForStatistic(statisticKey: string): SortDirection {
    if (statisticKey === '#' || statisticKey === 'Player') {
      return 'asc';
    }

    return 'desc';
  }
}
