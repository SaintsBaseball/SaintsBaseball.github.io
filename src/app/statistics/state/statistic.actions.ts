import { Action } from '@ngrx/store';
import { StatisticGroups } from 'src/app/enums/statistic-groups.enum';

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

  constructor(public payload: StatisticGroups) { }
}

export type StatisticActions = ChangeSeason | ChangeStatisticsGroup;