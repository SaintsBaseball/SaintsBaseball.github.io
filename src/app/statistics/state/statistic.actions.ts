import { Action } from '@ngrx/store';
import { StatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';

export enum StatisticActionTypes {
  Load = '[Statistics] Load',
  LoadSuccess = '[Statistics] Load Success',
  LoadFail = '[Statistics] Load Fail'
}

export class Load implements Action {
  readonly type = StatisticActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = StatisticActionTypes.LoadSuccess;

  constructor(public payload: StatisticsDatabaseTable) { }
}

export type StatisticActions = Load
  | LoadSuccess;