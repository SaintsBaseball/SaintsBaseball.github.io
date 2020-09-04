import { createSelector } from '@ngrx/store';
import { PlayerHittingStatisticsDatabaseTable } from '../in-memory-data-service/player-hitting-statistics-database-table';

export interface State {
  playerHittingStatistics: PlayerHittingStatisticsDatabaseTable
}

function getAppState (state): State {
  return state.appState;
};

export const getPlayerHittingStatistics = createSelector(
  getAppState,
  state => state.playerHittingStatistics
)