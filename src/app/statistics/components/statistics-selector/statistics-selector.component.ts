import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StatisticGroup } from 'app/types/statistic-group';
import { PlayerHittingStatisticsDatabaseTable } from 'app/in-memory-data-service/player-hitting-statistics-database-table';
import { BaseballSeason } from 'app/types/baseball-season';
import { StatisticType } from 'app/types/statistic-type';
import { PlayerPitchingStatisticsDatabaseTable } from 'app/in-memory-data-service/player-pitching-statistics-database-table';

@Component({
  selector: 'statistics-selector',
  templateUrl: './statistics-selector.component.html',
  styleUrls: ['./statistics-selector.component.css']
})
export class StatisticsSelectorComponent implements OnInit {
  @Input() playerHittingStatistics: PlayerHittingStatisticsDatabaseTable;
  @Input() playerPitchingStatistics: PlayerPitchingStatisticsDatabaseTable;
  @Input() currentSeason: BaseballSeason;
  @Input() selectedStatisticsGroup: StatisticGroup;
  @Input() selectedStatisticsType: string;
  @Output() seasonChanged = new EventEmitter<string>();
  @Output() statisticsGroupChanged = new EventEmitter<StatisticGroup>();
  @Output() statisticsTypeChanged = new EventEmitter<StatisticType>();
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

  changeSelectedStatisticsType(statisticsTypeName: StatisticType): void {
    this.statisticsTypeChanged.emit(statisticsTypeName);
  }
}
