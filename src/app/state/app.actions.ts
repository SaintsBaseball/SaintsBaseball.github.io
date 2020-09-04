import { Action } from '@ngrx/store';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';

export enum AppActionTypes {
  Load = '[App] Load',
  LoadSuccess = '[App] Load Success',
  // LoadFail = '[Statistics] Load Fail'
}

export class Load implements Action {
  readonly type = AppActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = AppActionTypes.LoadSuccess;

  constructor(public payload: PlayerHittingStatisticsDatabaseTable) { }
}

// export class LoadFail implements Action {
//   readonly type = AppActionTypes.LoadFail;
// }

export type AppActions = Load
  | LoadSuccess
  // | LoadFail;