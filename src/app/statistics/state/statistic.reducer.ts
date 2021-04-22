import { StatisticActions, StatisticActionTypes } from './statistic.actions';

export interface StatisticState {
  currentSeason: string
}

const initialState: StatisticState = {
  currentSeason: ''
}

export function reducer(state = initialState, action: StatisticActions): StatisticState {
  switch (action.type) {
    case StatisticActionTypes.ChangeSeason:
      return {
        ...state,
        currentSeason: action.payload
      };

    default:
      return state;
  }
}