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

  getTooltipMessage(statisticKey: string): string {
    const commonAbbreviationToStatisticDictionary = {
      G: 'Games',
      AB: 'At Bats',
      R: 'Runs', 
      H: 'Hits', 
      '2B': 'Doubles', 
      '3B': 'Triples', 
      HR: 'Home Runs', 
      RBI: 'Runs Batted In', 
      BB: 'Walks', 
      SO: 'Strikeouts',
      CS: 'Caught Stealing', 
      OBP: 'On-Base Percentage', 
      SLG: 'Slugging Percentage', 
      OPS: 'On-Base Plus Slugging', 
      IBB: 'Intentional Walks', 
      HBP:'Hit By Pitch', 
      SAC: 'Sacrifice Bunts', 
      SF: 'Sacrifice Flys', 
      TB: 'Total Bases', 
      XBH: 'Extra Base Hits', 
      GIDP: 'Ground Into Double Play', 
      GO: 'Ground Outs', 
      AO: 'Fly Outs', 
      'GO/AO': 'Ground Outs Per Fly Out', 
      PA: 'Plate Appearances',
      BABIP: 'Average on Balls in Play',
      ISO: 'Isolated Power',
      'AB/HR': 'At Bats per Home Run',
      'BB/K': 'Walk to Strikout Ratio',
      'BB%': 'Walk Percentage',
      'SO%': 'Strikeout Percentage',
      W: 'Wins',
      L: 'Losses',
      ERA: 'Earned Run Average',
      GS: 'Games Started',
      CG: 'Complete Games',
      SHO: 'Shutouts',
      SV: 'Saves',
      SVO: 'Save Opportunities',
      IP: 'Innings Pitched',
      ER: 'Earned Runs',
      HB: 'Hit Batsmen',
      WHIP: 'Walks & Hits Per Inning',
      TBF: 'Total Batters Faced',
      NP: 'Number of Pitches',
      'P/IP': 'Pitches per Innings Pitched',
      QS: 'Quality Starts',
      GF: 'Games Finished',
      HLD: 'Holds',
      WP: 'Wild Pitches',
      BK: 'Balks',
      GDP: 'Ground Into Double Play',
      'SO/9': 'Strikeouts per 9 IP',
      'BB/9': 'Walks per 9 IP',
      'K/BB': 'Strikeout to Walk Rate',
      PK: 'Pickoffs'
    };

    const hittingAbbreviationToStatisticDictionary = {
      AVG: 'Batting Average',
      SB: 'Stolen Bases'
    };

    const pitchingAbbreviationToStatisticDictionary = {
      AVG: 'Batting Average Against',
      SB: 'Stolen Bases Allowed'
    };

    const abbreviationToStatisticTypeDictionary = this.selectedStatisticsType === 'hitting' ? hittingAbbreviationToStatisticDictionary : pitchingAbbreviationToStatisticDictionary;

    return commonAbbreviationToStatisticDictionary[statisticKey] ?? abbreviationToStatisticTypeDictionary[statisticKey] ?? '';
  }
}
