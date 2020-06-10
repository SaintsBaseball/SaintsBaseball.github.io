import { IDatabase } from './i-database';
import { StatisticsDatabaseTable } from './statistics-database-table';

export class SaintsDatabase implements IDatabase {
  stats: StatisticsDatabaseTable
}
