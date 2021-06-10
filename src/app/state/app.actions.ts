import { Action } from '@ngrx/store';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import { PlayerHittingStatistics } from '../classes/player-hitting-statistics';
import { PlayerPitchingStatisticsDatabaseTable } from '../in-memory-data-service/player-pitching-statistics-database-table';

export enum AppActionTypes {
  Load = '[App] Load',
  LoadSuccess = '[App] Load Success',
  LoadFail = '[App] Load Fail',
  LoadPitchingStatistics = '[App] Load Pitching Statistics',
  LoadPitchingStatisticsSuccess = '[App] Load Pitching Statistics Success',
  FormatStatsForEachPlayer = '[App] Format Stats For Each Player',
  FormatSuccess = '[App] Format Success'
}

export class Load implements Action {
  readonly type = AppActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = AppActionTypes.LoadSuccess;

  constructor(public payload: PlayerHittingStatisticsDatabaseTable) { }
}

export class LoadFail implements Action {
  readonly type = AppActionTypes.LoadFail;
}

export class LoadPitchingStatistics implements Action {
  readonly type = AppActionTypes.LoadPitchingStatistics;
}

export class LoadPitchingStatisticsSuccess implements Action {
  readonly type = AppActionTypes.LoadPitchingStatisticsSuccess;

  constructor(public payload: PlayerPitchingStatisticsDatabaseTable) { }
}

export class FormatStatsForEachPlayer implements Action {
  readonly type = AppActionTypes.FormatStatsForEachPlayer;

  constructor(public payload: PlayerHittingStatisticsDatabaseTable) { }
}

export class FormatSuccess implements Action {
  readonly type = AppActionTypes.FormatSuccess;

  constructor(public payload: Map<string, Map<string, PlayerHittingStatistics>>) { }
}

export type AppActions = LoadSuccess
  | LoadFail
  | LoadPitchingStatisticsSuccess
  | FormatSuccess;
