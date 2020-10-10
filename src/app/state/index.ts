import { createSelector } from '@ngrx/store';
import { PlayerHittingStatisticsDatabaseTable } from '../in-memory-data-service/player-hitting-statistics-database-table';
import { PlayerHittingStatistics } from '../classes/player-hitting-statistics';

export interface State {
  playerHittingStatistics: PlayerHittingStatisticsDatabaseTable;
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

export const getErrorMessage = createSelector(
  getAppState,
  state => state.errorMessage
);

export const getStatsForEachPlayer = createSelector(
  getAppState,
  state => state.statsForEachPlayer
);
