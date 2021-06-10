import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {mergeMap, map, catchError, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import { IStatisticsService } from 'src/app/interfaces/i-statistics-service';
import * as appActions from './app.actions';
import { PlayerHittingStatistics } from '../classes/player-hitting-statistics';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    @Inject('IStatisticsService') private statisticsService: IStatisticsService
  ) { }

  @Effect()
  loadApp$ = this.actions$.pipe(
    ofType(appActions.AppActionTypes.Load),
    mergeMap(() => this.statisticsService.getPlayerHittingStatistics().pipe(
      switchMap(statistics => [
        (new appActions.LoadSuccess(statistics)),
        (new appActions.FormatStatsForEachPlayer(statistics))
      ]),
      catchError(() => of(new appActions.LoadFail()))
    ))
  );

  @Effect()
  loadPitchingStatistics$ = this.actions$.pipe(
    ofType(appActions.AppActionTypes.LoadPitchingStatistics),
    mergeMap(() => this.statisticsService.getPlayerPitchingStatistics().pipe(
      switchMap(statistics => [
        (new appActions.LoadPitchingStatisticsSuccess(statistics))
      ])
      //   (new appActions.FormatStatsForEachPlayer(statistics))
      // ]),
      // catchError(() => of(new appActions.LoadFail()))
    ))
  );

  @Effect()
  formatStatsForEachPlayer$ = this.actions$.pipe(
    ofType(appActions.AppActionTypes.FormatStatsForEachPlayer),
    map((formatStatsForEachPlayerAction: appActions.FormatStatsForEachPlayer) => {
      const statistics = formatStatsForEachPlayerAction.payload;
      const statsForEachPlayer = new Map<string, Map<string, PlayerHittingStatistics>>();

      Object.keys(statistics).forEach(seasonKey => {
        const statsForASeason: PlayerHittingStatistics[] = statistics[seasonKey];
        statsForASeason.forEach(playerStats => {
          const playerName = playerStats.Player;

          if (!statsForEachPlayer.get(playerName)) {
            statsForEachPlayer.set(playerName, new Map<string, PlayerHittingStatistics>());
          }

          const statsForOnePlayer = statsForEachPlayer.get(playerName);
          statsForOnePlayer.set(seasonKey, playerStats);
        });
      });

      return new appActions.FormatSuccess(statsForEachPlayer);
    })
  );
}
