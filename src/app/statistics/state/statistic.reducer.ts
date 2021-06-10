import { BaseballSeason } from 'src/app/types/baseball-season';
import { StatisticGroup } from 'src/app/types/statistic-groups.enum';
import { StatisticActions, StatisticActionTypes } from './statistic.actions';

export interface StatisticState {
  currentSeason: BaseballSeason;
  selectedStatisticsGroup: StatisticGroup;
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