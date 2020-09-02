import { Observable } from 'rxjs';
import { PlayerHittingStatisticsDatabaseTable } from '../in-memory-data-service/statistics-database-table';

export interface IStatisticsService {
    getPlayerHittingStatistics(): Observable<PlayerHittingStatisticsDatabaseTable>;
}
