import { StatisticActions, StatisticActionTypes } from './statistic.actions';

export interface StatisticState {
  currentSeason: string;
  selectedStatisticsGroup: string;
}

const initialState: StatisticState = {
  currentSeason: '',
  selectedStatisticsGroup: 'standard'
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

    default:
      return state;
  }
}