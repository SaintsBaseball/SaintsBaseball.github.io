import { StatisticActions, StatisticActionTypes } from './statistic.actions';

export interface StatisticState {
  currentSeason: string,
  selectedStatistic: string
}

const initialState: StatisticState = {
  currentSeason: 'Season',
  selectedStatistic: '#'
}

export function reducer(state = initialState, action: StatisticActions): StatisticState {
  switch (action.type) {
    case StatisticActionTypes.ChangeSeason:
      return {
        ...state,
        currentSeason: action.payload,
        selectedStatistic: '#'
      };

    case StatisticActionTypes.ChangeSelectedStatistic:
      return {
        ...state,
        selectedStatistic: action.payload
      };

    default:
      return state;
  }
}