import { Action } from '@ngrx/store';
import { BaseballSeason } from 'src/app/types/baseball-season';
import { StatisticGroup } from 'src/app/types/statistic-group';

export enum StatisticActionTypes {
  ChangeSeason = '[Statistics] Change Season',
  ChangeStatisticsGroup = '[Statsitics] Change Statistics Group'
}

export class ChangeSeason implements Action {
  readonly type = StatisticActionTypes.ChangeSeason;

  constructor(public payload: BaseballSeason) { }
}

export class ChangeStatisticsGroup implements Action {
  readonly type = StatisticActionTypes.ChangeStatisticsGroup;

  constructor(public payload: StatisticGroup) { }
}

export type StatisticActions = ChangeSeason | ChangeStatisticsGroup;