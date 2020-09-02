import { Injectable, Inject } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { IStatisticsService } from 'src/app/interfaces/i-statistics-service';
import * as appActions from './app.actions';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    @Inject('IStatisticsService') private statisticsService: IStatisticsService
  ) { }

  @Effect()
  loadStatistics$ = this.actions$.pipe(
    ofType(appActions.AppActionTypes.Load),
    mergeMap(() => this.statisticsService.getPlayerHittingStatistics().pipe(
      // map(statistics => (new appActions.LoadSuccess(statistics))),
      // catchError(() => of(new appActions.LoadFail()))
    ))
  )
}