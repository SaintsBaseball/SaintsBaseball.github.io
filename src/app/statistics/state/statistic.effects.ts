import { Injectable, Inject } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { IStatisticsService } from 'src/app/interfaces/i-statistics-service';
import * as statisticsActions from './statistic.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class StatisticsEffects {
  constructor(
    private actions$: Actions,
    @Inject('IStatisticsService') private statisticsService: IStatisticsService
  ) { }

  @Effect()
  loadStatistics$ = this.actions$.pipe(
    ofType(statisticsActions.StatisticActionTypes.Load),
    mergeMap(() => this.statisticsService.getPlayerHittingStatistics().pipe(
      map(statistics => (new statisticsActions.LoadSuccess(statistics))),
      catchError(() => of(new statisticsActions.LoadFail()))
    ))
  )
}