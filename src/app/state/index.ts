import { createSelector } from '@ngrx/store';
import { PlayerHittingStatisticsDatabaseTable } from '../in-memory-data-service/player-hitting-statistics-database-table';
import { PlayerHittingStatistics } from '../classes/player-hitting-statistics';
import { PlayerPitchingStatisticsDatabaseTable } from '../in-memory-data-service/player-pitching-statistics-database-table';

export interface State {
  playerHittingStatistics: PlayerHittingStatisticsDatabaseTable;
  playerPitchingStatistics: PlayerPitchingStatisticsDatabaseTable;
  errorMessage: string;
  statsForEachPlayer: Map<string, Map<string, PlayerHittingStatistics>>;
}

function getAppState(state): State {
  return state.appState;
}

export const getPlayerHittingStatistics = createSelector(
  getAppState,
  state => state.playerHittingStatistics
);

export const getPlayerPitchingStatistics = createSelector(
  getAppState,
  state => state.playerPitchingStatistics
);

export const getErrorMessage = createSelector(
  getAppState,
  state => state.errorMessage
);

export const getStatsForEachPlayer = createSelector(
  getAppState,
  state => state.statsForEachPlayer
);
