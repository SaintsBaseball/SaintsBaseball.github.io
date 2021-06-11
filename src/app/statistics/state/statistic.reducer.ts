import { BaseballSeason } from 'src/app/types/baseball-season';
import { StatisticGroup } from 'src/app/types/statistic-group';
import { StatisticType } from 'src/app/types/statistic-type';
import { StatisticActions, StatisticActionTypes } from './statistic.actions';

export interface StatisticState {
  currentSeason: BaseballSeason;
  selectedStatisticsGroup: StatisticGroup;
  selectedStatisticsType: StatisticType;
}

const initialState: StatisticState = {
  currentSeason: '',
  selectedStatisticsGroup: 'standard',
  selectedStatisticsType: 'hitting'
}

export function reducer(state = initialState, action: StatisticActions): StatisticState {
  switch (action.type) {
    case StatisticActionTypes.ChangeSeason:
      return {
        ...state,
        currentSeason: action.payload
      };

    case StatisticActionTypes.ChangeStatisticsGroup:
      return {
        ...state,
        selectedStatisticsGroup: action.payload
      };

    case StatisticActionTypes.ChangeStatisticsType:
      return {
        ...state,
        selectedStatisticsType: action.payload,
        currentSeason: initialState.currentSeason
      };

    default:
      return state;
  }
}