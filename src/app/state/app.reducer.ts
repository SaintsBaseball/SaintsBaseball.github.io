import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import { AppActions, AppActionTypes } from './app.actions';
import { State } from '.';
import { PlayerHittingStatistics } from '../classes/player-hitting-statistics';

const initialState: State = {
  playerHittingStatistics: new PlayerHittingStatisticsDatabaseTable(),
  errorMessage: null,
  statsForEachPlayer: new Map<string, Map<string, PlayerHittingStatistics>>()
};

export function reducer(state = initialState, action: AppActions): State {
  switch (action.type) {
    case AppActionTypes.LoadSuccess:
      return {
        ...state,
        playerHittingStatistics: action.payload,
        errorMessage: null
      };

    case AppActionTypes.LoadFail:
      return {
        ...state,
        playerHittingStatistics: new PlayerHittingStatisticsDatabaseTable(),
        errorMessage: 'Could not load statistics'
      };

    case AppActionTypes.FormatSuccess:
      return {
        ...state,
        statsForEachPlayer: action.payload
      };

    default:
      return state;
  }
}
