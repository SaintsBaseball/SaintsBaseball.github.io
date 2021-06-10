import { PlayerHittingStatisticsDatabaseTable } from './player-hitting-statistics-database-table';
import { PlayerPitchingStatisticsDatabaseTable } from './player-pitching-statistics-database-table';

export class SaintsDatabase {
  hittingStatistics: PlayerHittingStatisticsDatabaseTable;
  pitchingStatistics: PlayerPitchingStatisticsDatabaseTable;
}
