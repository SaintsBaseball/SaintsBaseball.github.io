import { Action } from '@ngrx/store';

export enum StatisticActionTypes {
  ChangeSeason = '[Statistics] Change Season',
  ChangeSelectedStatistic = '[Statsitics] Change Selected Statistic'
}

export class ChangeSeason implements Action {
  readonly type = StatisticActionTypes.ChangeSeason;

  constructor(public payload: string) { }
}

export type StatisticActions = ChangeSeason;