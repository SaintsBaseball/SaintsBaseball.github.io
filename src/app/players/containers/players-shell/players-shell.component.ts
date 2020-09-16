import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import * as fromRoot from 'src/app/state';
import { PlayerHittingStatistics } from 'src/app/classes/player-hitting-statistics';

@Component({
  selector: 'players-shell',
  templateUrl: './players-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersShellComponent implements OnInit, OnDestroy {
  title: string = 'Saints Players';
  hittingStatisticsByPlayer: Map<string, Map<string, PlayerHittingStatistics>>;
  errorMessage$: Observable<string>;
  private getPlayerHittingStatisticsSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.getPlayerHittingStatisticsSubscription = this.store.pipe(select(fromRoot.getPlayerHittingStatistics)).subscribe((playerHittingStatisticsData) => {
      this.buildStatsForEachPlayer(playerHittingStatisticsData);
    });
    this.errorMessage$ = this.store.pipe(select(fromRoot.getErrorMessage));
  }

  ngOnDestroy(): void {
    this.getPlayerHittingStatisticsSubscription.unsubscribe();
  }

  private buildStatsForEachPlayer(playerHittingStatisticsData: PlayerHittingStatisticsDatabaseTable): void {
    this.hittingStatisticsByPlayer = new Map<string, Map<string, PlayerHittingStatistics>>();

    Object.keys(playerHittingStatisticsData).forEach(seasonKey => {
      const statsForASeason: PlayerHittingStatistics[] = playerHittingStatisticsData[seasonKey];

      statsForASeason.forEach((playerStats: PlayerHittingStatistics) => {
        const playerName = playerStats.Player;

        if (!this.hittingStatisticsByPlayer.get(playerName)) {
          this.hittingStatisticsByPlayer.set(playerName, new Map<string, PlayerHittingStatistics>());
        }

        const seasonToPlayerHittingStatisticsMap = this.hittingStatisticsByPlayer.get(playerName);
        seasonToPlayerHittingStatisticsMap.set(seasonKey, playerStats);
      });
    });
  }
}
