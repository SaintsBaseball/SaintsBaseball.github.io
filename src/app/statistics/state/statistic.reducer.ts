import { StatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';
import { StatisticActions, StatisticActionTypes } from './statistic.actions';

export interface StatisticState {
  statistics: StatisticsDatabaseTable,
  errorMessage: string,
  currentSeason: string,
  selectedStatistic: string
}

const initialState: StatisticState = {
  statistics: new StatisticsDatabaseTable(),
  errorMessage: null,
  currentSeason: 'Season',
  selectedStatistic: '#'
}

export function reducer(state = initialState, action: StatisticActions): StatisticState {
  switch (action.type) {
    case StatisticActionTypes.LoadSuccess:
      return {
        ...state,
        statistics: action.payload
      };

    case StatisticActionTypes.LoadFail:
      return {
        ...state,
        statistics: initialState.statistics,
        errorMessage: 'Could not load statistics'
      };

    case StatisticActionTypes.ChangeSeason:
      return {
        ...state,
        currentSeason: action.payload,
        selectedStatistic: '#'
      };

    default:
      return state;
  }
}