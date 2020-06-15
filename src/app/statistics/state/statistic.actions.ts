import { Action } from '@ngrx/store';

export enum StatisticActionTypes {
  Load = '[Statistics] Load',
  LoadSuccess = '[Statistics] Load Success',
  LoadFail = '[Statistics] Load Fail'
}

export class Load implements Action {
  readonly type = StatisticActionTypes.Load;
}
