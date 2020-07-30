import { Action } from '@ngrx/store';
import { StatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';

export enum StatisticActionTypes {
  Load = '[Statistics] Load',
  LoadSuccess = '[Statistics] Load Success',
  LoadFail = '[Statistics] Load Fail',
  ChangeSeason = '[Statistics] Change Season'
}

export class Load implements Action {
  readonly type = StatisticActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = StatisticActionTypes.LoadSuccess;

  constructor(public payload: StatisticsDatabaseTable) { }
}

export class LoadFail implements Action {
  readonly type = StatisticActionTypes.LoadFail;
}

export class ChangeSeason implements Action {
  readonly type = StatisticActionTypes.ChangeSeason;

  constructor(public payload: string) { }
}

export type StatisticActions = Load
  | LoadSuccess
  | LoadFail
  | ChangeSeason;