import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import { AppActions, AppActionTypes } from './app.actions';
import { State } from '.';

const initialState: State = {
  playerHittingStatistics: new PlayerHittingStatisticsDatabaseTable()
}

export function reducer(state = initialState, action: AppActions): State {
  switch (action.type) {
    case AppActionTypes.LoadSuccess:
      return {
        ...state,
        playerHittingStatistics: action.payload
      };

    default:
      return state;
  }
}