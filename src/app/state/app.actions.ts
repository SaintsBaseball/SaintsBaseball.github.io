import { Action } from '@ngrx/store';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import { PlayerHittingStatistics } from '../classes/player-hitting-statistics';
import { PlayerPitchingStatisticsDatabaseTable } from '../in-memory-data-service/player-pitching-statistics-database-table';

export enum AppActionTypes {
  LoadHittingStatistics = '[App] Load Hitting Statistics',
  LoadHittingStatisticsSuccess = '[App] Load Hitting Statistics Success',
  LoadHittingStatisticsFail = '[App] Load Hitting Statistics Fail',
  LoadPitchingStatistics = '[App] Load Pitching Statistics',
  LoadPitchingStatisticsSuccess = '[App] Load Pitching Statistics Success',
  FormatHittingStatisticsForEachPlayer = '[App] Format Hitting Statistics For Each Player',
  FormatHittingStatisticsSuccess = '[App] Format Hitting Statistics Success'
}

export class LoadHittingStatistics implements Action {
  readonly type = AppActionTypes.LoadHittingStatistics;
}

export class LoadHittingStatisticsSuccess implements Action {
  readonly type = AppActionTypes.LoadHittingStatisticsSuccess;

  constructor(public payload: PlayerHittingStatisticsDatabaseTable) { }
}

export class LoadHittingStatisticsFail implements Action {
  readonly type = AppActionTypes.LoadHittingStatisticsFail;
}

export class LoadPitchingStatistics implements Action {
  readonly type = AppActionTypes.LoadPitchingStatistics;
}

export class LoadPitchingStatisticsSuccess implements Action {
  readonly type = AppActionTypes.LoadPitchingStatisticsSuccess;

  constructor(public payload: PlayerPitchingStatisticsDatabaseTable) { }
}

export class FormatHittingStatisticsForEachPlayer implements Action {
  readonly type = AppActionTypes.FormatHittingStatisticsForEachPlayer;

  constructor(public payload: PlayerHittingStatisticsDatabaseTable) { }
}

export class FormatHittingStatisticsSuccess implements Action {
  readonly type = AppActionTypes.FormatHittingStatisticsSuccess;

  constructor(public payload: Map<string, Map<string, PlayerHittingStatistics>>) { }
}

export type AppActions = LoadHittingStatisticsSuccess
  | LoadHittingStatisticsFail
  | LoadPitchingStatisticsSuccess
  | FormatHittingStatisticsSuccess;
