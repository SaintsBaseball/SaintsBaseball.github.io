import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StatisticGroups } from 'src/app/enums/statistic-groups.enum';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';

@Component({
  selector: 'statistics-selector',
  templateUrl: './statistics-selector.component.html',
  styleUrls: ['./statistics-selector.component.css']
})
export class StatisticsSelectorComponent implements OnInit {
  @Input() playerHittingStatistics: PlayerHittingStatisticsDatabaseTable;
  @Input() currentSeason: string;
  @Input() selectedStatisticsGroup: string;
  @Output() seasonChanged = new EventEmitter<string>();
  @Output() statisticsGroupChanged = new EventEmitter<StatisticGroups>();
  selectedStatisticsGroupControl: FormControl;

  ngOnInit(): void {
    this.selectedStatisticsGroupControl = new FormControl(this.selectedStatisticsGroup);
  }

  changeSeason(seasonName: string): void {
    this.seasonChanged.emit(seasonName);
  }

  changeSelectedStatisticsGroup(statisticsGroupName: StatisticGroups): void {
    this.statisticsGroupChanged.emit(statisticsGroupName);
  }
}
