import { Component, Input, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlayerHittingStatistics } from 'src/app/classes/player-hitting-statistics';
import { StatisticGroup } from 'src/app/types/statistic-group';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import { BaseballSeason } from 'src/app/types/baseball-season';

@Component({
  selector: 'statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnChanges, AfterViewInit {
  @Input() playerHittingStatistics: PlayerHittingStatisticsDatabaseTable;
  @Input() currentSeason: BaseballSeason;
  @Input() selectedStatistic: string;
  @Input() selectedStatisticsGroup: StatisticGroup;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<PlayerHittingStatistics[]> = new MatTableDataSource<PlayerHittingStatistics[]>();
  displayedColumns: string[] = [];
  private standardStatisticColumns: string[] = ['#', 'Player', 'G', 'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'BB', 'SO', 'SB', 'CS', 'AVG', 'OBP', 'SLG', 'OPS'];
  private advancedStatisticColumns: string[] = ['#', 'Player', 'PA', 'HBP', 'SAC', 'SF', 'GIDP', 'GO/AO', 'XBH', 'TB', 'IBB', 'BABIP', 'ISO', 'AB/HR', 'BB/K', 'BB%', 'SO%'];
  private statisticsGroupToColumnsDictionary = {
    standard: this.standardStatisticColumns,
    advanced: this.advancedStatisticColumns
  };

  ngOnChanges(): void {    
    this.dataSource.data = this.playerHittingStatistics[this.currentSeason] ?? [];

    if (this.dataSource.data.length > 0) {
      this.displayedColumns = this.statisticsGroupToColumnsDictionary[this.selectedStatisticsGroup];
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

  getTooltipMessage(statisticKey: string): string {
    const abbreviationToStatisticDictionary = {
      G: 'Games',
      AB: 'At Bats',
      R: 'Runs', 
      H: 'Hits', 
      '2B': 'Doubles', 
      '3B': 'Triples', 
      HR: 'Homeruns', 
      RBI : 'Runs Batted In', 
      BB : 'Base On Balls', 
      SO: 'Strikeouts',
      SB :  'Stolen Bases', 
      CS: 'Caught Stealing', 
      AVG: 'Average', 
      OBP: 'On-Base Percentage', 
      SLG: 'Slugging Percentage', 
      OPS: 'On-Base Plus Slugging', 
      IBB: 'Intentional Walks', 
      HBP:'Hit By Pitch', 
      SAC: 'Sacrifice Bunts', 
      SF: 'Sacrifice Flys', 
      TB: 'Total Bases', 
      XBH: 'Extra Base Hits', 
      GIDP: 'Grounded Into Double Play', 
      GO: 'Ground Outs', 
      AO: 'Fly Outs', 
      'GO/AO': 'Ground Outs Per Fly Out', 
      PA: 'Plate Appearances',
      BABIP: 'Average on Balls in Play',
      ISO: 'Isolated Power',
      'AB/HR': 'At Bats per Home Run',
      'BB/K': 'Walk to Strikout Ratio',
      'BB%': 'Walk Percentage',
      'SO%': 'Strikeout Percentage'
    };

    return abbreviationToStatisticDictionary[statisticKey] || '';
  }
}
