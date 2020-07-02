import * as fromRoot from '../../state/app.state';
import { StatisticState } from './statistic.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
  statistics: StatisticState
}

const getStatisticFeatureState = createFeatureSelector<StatisticState>('statistics');

export const getStatistics = createSelector(
  getStatisticFeatureState,
  state => state.statistics
)

export const getErrorMessage = createSelector(
  getStatisticFeatureState,
  state => state.errorMessage
)