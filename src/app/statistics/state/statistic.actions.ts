import { Action } from '@ngrx/store';

export enum StatisticActionTypes {
  ChangeSeason = '[Statistics] Change Season',
  ChangeStatisticsGroup = '[Statsitics] Change Statistics Group'
}

export class ChangeSeason implements Action {
  readonly type = StatisticActionTypes.ChangeSeason;

  constructor(public payload: string) { }
}

export class ChangeStatisticsGroup implements Action {
  readonly type = StatisticActionTypes.ChangeStatisticsGroup;

  constructor(public payload: string) { }
}

export type StatisticActions = ChangeSeason | ChangeStatisticsGroup;