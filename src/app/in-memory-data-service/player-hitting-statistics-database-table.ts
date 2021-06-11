import { PlayerHittingStatistics } from '../classes/player-hitting-statistics';
import { IPlayerStatisticsDatabaseTable } from './i-player-statistics-database-table';

export class PlayerHittingStatisticsDatabaseTable implements IPlayerStatisticsDatabaseTable {
  'Spring 2021'?: PlayerHittingStatistics[];
  'Fall 2019-2020'?: PlayerHittingStatistics[];
  'Spring 2019'?: PlayerHittingStatistics[];
}