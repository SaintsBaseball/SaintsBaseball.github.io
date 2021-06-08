import * as fromRoot from '../../state';
import { StatisticState } from './statistic.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
  statistics: StatisticState
}

const getStatisticFeatureState = createFeatureSelector<StatisticState>('statistics');

export const getCurrentSeason = createSelector(
  getStatisticFeatureState,
  state => state.currentSeason
)

export const getSelectedStatisticsGroup = createSelector(
  getStatisticFeatureState,
  state => state.selectedStatisticsGroup
)
