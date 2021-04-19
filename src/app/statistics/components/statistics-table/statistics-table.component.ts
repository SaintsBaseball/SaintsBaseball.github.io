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
      GDP: 'Grounded Into Double Play', 
      GO: 'Ground Outs', 
      AO: 'Fly Outs', 
      GO_AO: 'Ground Outs Per Fly Out', 
      PA: 'Plate Appearances'
    };

    return abbreviationToStatisticDictionary[statisticKey] || '';
  }
}
