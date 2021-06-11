import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import { AppActions, AppActionTypes } from './app.actions';
import { State } from '.';
import { PlayerHittingStatistics } from '../classes/player-hitting-statistics';
import { PlayerPitchingStatisticsDatabaseTable } from '../in-memory-data-service/player-pitching-statistics-database-table';

const initialState: State = {
  playerHittingStatistics: new PlayerHittingStatisticsDatabaseTable(),
  playerPitchingStatistics: new PlayerPitchingStatisticsDatabaseTable(),
  errorMessage: null,
  statsForEachPlayer: new Map<string, Map<string, PlayerHittingStatistics>>()
};

export function reducer(state = initialState, action: AppActions): State {
  switch (action.type) {
    case AppActionTypes.LoadHittingStatisticsSuccess:
      return {
        ...state,
        playerHittingStatistics: action.payload
      };

    case AppActionTypes.LoadHittingStatisticsFail:
      return {
        ...state,
        playerHittingStatistics: new PlayerHittingStatisticsDatabaseTable(),
        errorMessage: 'Could not load hitting statistics',
        statsForEachPlayer: new Map<string, Map<string, PlayerHittingStatistics>>()
      };

    case AppActionTypes.LoadPitchingStatisticsSuccess:
      return {
        ...state,
        playerPitchingStatistics: action.payload
      };

    case AppActionTypes.LoadPitchingStatisticsFail:
      return {
        ...state,
        playerPitchingStatistics: new PlayerPitchingStatisticsDatabaseTable(),
        errorMessage: 'Could not load pitching statistics'
      };

    case AppActionTypes.FormatHittingStatisticsSuccess:
      return {
        ...state,
        statsForEachPlayer: action.payload
      };

    default:
      return state;
  }
}
