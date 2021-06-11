import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StatisticGroup } from 'src/app/types/statistic-group';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import { BaseballSeason } from 'src/app/types/baseball-season';

@Component({
  selector: 'statistics-selector',
  templateUrl: './statistics-selector.component.html',
  styleUrls: ['./statistics-selector.component.css']
})
export class StatisticsSelectorComponent implements OnInit {
  @Input() playerHittingStatistics: PlayerHittingStatisticsDatabaseTable;
  @Input() currentSeason: BaseballSeason;
  @Input() selectedStatisticsGroup: StatisticGroup;
  @Input() selectedStatisticsType: string;
  @Output() seasonChanged = new EventEmitter<string>();
  @Output() statisticsGroupChanged = new EventEmitter<StatisticGroup>();
  @Output() statisticsTypeChanged = new EventEmitter<string>();
  selectedStatisticsGroupControl: FormControl;
  selectedStatisticsTypeControl: FormControl;

  ngOnInit(): void {
    this.selectedStatisticsGroupControl = new FormControl(this.selectedStatisticsGroup);
    this.selectedStatisticsTypeControl = new FormControl(this.selectedStatisticsType);
  }

  changeSeason(seasonName: string): void {
    this.seasonChanged.emit(seasonName);
  }

  changeSelectedStatisticsGroup(statisticsGroupName: StatisticGroup): void {
    this.statisticsGroupChanged.emit(statisticsGroupName);
  }

  changeSelectedStatisticsType(statisticsTypeName: string): void {
    this.statisticsTypeChanged.emit(statisticsTypeName);
  }
}
