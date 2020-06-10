import { Observable } from 'rxjs';
import { StatisticsDatabaseTable } from '../in-memory-data-service/statistics-database-table';

export interface IStatisticsService {
    getPlayerHittingStatistics(): Observable<StatisticsDatabaseTable>;
}
