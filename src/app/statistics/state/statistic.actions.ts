import { Action } from '@ngrx/store';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';

export enum StatisticActionTypes {
  Load = '[Statistics] Load',
  LoadSuccess = '[Statistics] Load Success',
  LoadFail = '[Statistics] Load Fail',
  ChangeSeason = '[Statistics] Change Season',
  ChangeSelectedStatistic = '[Statsitics] Change Selected Statistic'
}

export class Load implements Action {
  readonly type = StatisticActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = StatisticActionTypes.LoadSuccess;

  constructor(public payload: PlayerHittingStatisticsDatabaseTable) { }
}

export class LoadFail implements Action {
  readonly type = StatisticActionTypes.LoadFail;
}

export class ChangeSeason implements Action {
  readonly type = StatisticActionTypes.ChangeSeason;

  constructor(public payload: string) { }
}

export class ChangeSelectedStatistic implements Action {
  readonly type = StatisticActionTypes.ChangeSelectedStatistic;

  constructor(public payload: string) { }
}

export type StatisticActions = Load
  | LoadSuccess
  | LoadFail
  | ChangeSeason
  | ChangeSelectedStatistic;