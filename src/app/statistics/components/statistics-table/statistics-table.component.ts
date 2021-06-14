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
      R: 'Runs', 
      H: 'Hits', 
      HR: 'Home Runs', 
      BB: 'Walks', 
      SO: 'Strikeouts',
      CS: 'Caught Stealing', 
      IBB: 'Intentional Walks', 
      'GO/AO': 'Ground Outs Per Fly Out', 
      BABIP: 'Average on Balls in Play'
    };

    const hittingAbbreviationToStatisticDictionary = {
      AB: 'At Bats',
      '2B': 'Doubles',
      '3B': 'Triples',
      RBI: 'Runs Batted In',
      SB: 'Stolen Bases',
      AVG: 'Batting Average',
      OBP: 'On-Base Percentage',
      SLG: 'Slugging Percentage',
      OPS: 'On-Base Plus Slugging',
      PA: 'Plate Appearances',
      HBP: 'Hit By Pitch', 
      SAC: 'Sacrifice Bunts', 
      SF: 'Sacrifice Flys',
      GIDP: 'Ground Into Double Play',
      XBH: 'Extra Base Hits',
      TB: 'Total Bases',
      ISO: 'Isolated Power',
      'AB/HR': 'At Bats per Home Run',
      'BB/K': 'Walk to Strikout Ratio',
      'BB%': 'Walk Percentage',
      'SO%': 'Strikeout Percentage'
    };

    const pitchingAbbreviationToStatisticDictionary = {
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
      AVG: 'Batting Average Against',
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
      SB: 'Stolen Bases Allowed',
      PK: 'Pickoffs'
    };

    const abbreviationToStatisticTypeDictionary = this.selectedStatisticsType === 'hitting' ? hittingAbbreviationToStatisticDictionary : pitchingAbbreviationToStatisticDictionary;

    return commonAbbreviationToStatisticDictionary[statisticKey] ?? abbreviationToStatisticTypeDictionary[statisticKey] ?? '';
  }
}
