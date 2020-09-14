import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import * as fromRoot from 'src/app/state';

@Component({
  selector: 'players-shell',
  templateUrl: './players-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersShellComponent implements OnInit, OnDestroy {
  title: string = 'Saints Players';
  hittingStatisticsByPlayer;
  errorMessage$: Observable<string>;
  private getPlayerHittingStatisticsSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.getPlayerHittingStatisticsSubscription = this.store.pipe(select(fromRoot.getPlayerHittingStatistics)).subscribe((playerHittingStatisticsData) => {
      this.hittingStatisticsByPlayer = this.buildStatsForEachPlayer(playerHittingStatisticsData);
    });
    this.errorMessage$ = this.store.pipe(select(fromRoot.getErrorMessage));
  }

  ngOnDestroy(): void {
    this.getPlayerHittingStatisticsSubscription.unsubscribe();
  }

  private buildStatsForEachPlayer(playerHittingStatisticsData: PlayerHittingStatisticsDatabaseTable) {
    const statsForEachPlayer = {};
    Object.keys(playerHittingStatisticsData).forEach(seasonKey => {
        const statsForASeason = playerHittingStatisticsData[seasonKey];
        statsForASeason.forEach(playerStats => {
            const playerName = playerStats.Player;

            const playerStatsWithNoName = Object.assign({}, playerStats);
            delete playerStatsWithNoName.Player;

            if (!statsForEachPlayer[playerName]) {
                statsForEachPlayer[playerName] = {};
            }

            statsForEachPlayer[playerName][seasonKey] = playerStatsWithNoName;
        });
    });

    return statsForEachPlayer;
  }
}
