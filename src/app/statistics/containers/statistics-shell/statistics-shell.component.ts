import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../state';
import * as fromStatistics from '../../state';
import * as statisticActions from '../../state/statistic.actions';
import { Observable } from 'rxjs';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';

@Component({
  selector: 'statistics-shell',
  templateUrl: './statistics-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsShellComponent implements OnInit {
  title: string = 'Saints Statistics';
  playerHittingStatistics$: Observable<PlayerHittingStatisticsDatabaseTable>;
  errorMessage$: Observable<string>;
  currentSeason$: Observable<string>;
  selectedStatisticsGroup$: Observable<string>;

  constructor(private store: Store<fromStatistics.State>) { }

  ngOnInit(): void {
    this.playerHittingStatistics$ = this.store.pipe(select(fromRoot.getPlayerHittingStatistics));
    this.errorMessage$ = this.store.pipe(select(fromRoot.getErrorMessage));
    this.currentSeason$ = this.store.pipe(select(fromStatistics.getCurrentSeason));
    this.selectedStatisticsGroup$ = this.store.pipe(select(fromStatistics.getSelectedStatisticsGroup));
  }

  changeSeason(seasonName: string): void {
    this.store.dispatch(new statisticActions.ChangeSeason(seasonName));
  }

  changeStatisticsGroup(statisticsGroupName: string): void {
    this.store.dispatch(new statisticActions.ChangeStatisticsGroup(statisticsGroupName));
  }
}
