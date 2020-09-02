import { Observable } from 'rxjs';
import { PlayerHittingStatisticsDatabaseTable } from '../in-memory-data-service/player-hitting-statistics-database-table';

export interface IStatisticsService {
    getPlayerHittingStatistics(): Observable<PlayerHittingStatisticsDatabaseTable>;
}
