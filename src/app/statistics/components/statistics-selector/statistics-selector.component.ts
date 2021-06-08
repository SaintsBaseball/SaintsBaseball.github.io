import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  @Output() statisticsGroupChanged = new EventEmitter<string>();
  selectedStatisticsGroupControl: FormControl;

  ngOnInit(): void {
    this.selectedStatisticsGroupControl = new FormControl(this.selectedStatisticsGroup);
  }

  changeSeason(seasonName: string): void {
    this.seasonChanged.emit(seasonName);
  }

  changeSelectedStatisticsGroup(statisticsGroupName: string): void {
    this.statisticsGroupChanged.emit(statisticsGroupName);
  }
}
