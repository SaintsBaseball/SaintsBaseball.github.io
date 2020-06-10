import { IPlayerStatistics } from '../interfaces/i-player-statistics';
import { IDatabaseTable } from './i-database-table';

export class StatisticsDatabaseTable implements IDatabaseTable {
  'Fall 2019-2020': IPlayerStatistics;
  'Spring 2019': IPlayerStatistics;
}