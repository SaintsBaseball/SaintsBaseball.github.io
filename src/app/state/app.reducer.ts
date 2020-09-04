import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import { AppActions, AppActionTypes } from './app.actions';
import { State } from '.';

const initialState: State = {
  playerHittingStatistics: new PlayerHittingStatisticsDatabaseTable(),
  errorMessage: null
}

export function reducer(state = initialState, action: AppActions): State {
  switch (action.type) {
    case AppActionTypes.LoadSuccess:
      return {
        ...state,
        playerHittingStatistics: action.payload
      };

    case AppActionTypes.LoadFail:
      return {
        ...state,
        playerHittingStatistics: new PlayerHittingStatisticsDatabaseTable(),
        errorMessage: 'Could not load statistics'
      }

    default:
      return state;
  }
}