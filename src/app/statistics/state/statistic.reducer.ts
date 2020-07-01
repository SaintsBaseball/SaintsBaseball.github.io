import { StatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';
import { StatisticActions, StatisticActionTypes } from './statistic.actions';

export interface StatisticState {
  statistics: StatisticsDatabaseTable
}

const initialState: StatisticState = {
  statistics: {
    'Fall 2019-2020': [],
    'Spring 2019': []
  }
}

export function reducer(state = initialState, action: StatisticActions): StatisticState {
  switch (action.type) {
    case StatisticActionTypes.LoadSuccess:
      return {
        ...state,
        statistics: action.payload
      }

    default:
      return state;
  }
}