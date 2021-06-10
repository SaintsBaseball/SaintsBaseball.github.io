import { Observable } from 'rxjs';
import { PlayerHittingStatisticsDatabaseTable } from '../in-memory-data-service/player-hitting-statistics-database-table';
import { PlayerPitchingStatisticsDatabaseTable } from '../in-memory-data-service/player-pitching-statistics-database-table';

export interface IStatisticsService {
    getPlayerHittingStatistics(): Observable<PlayerHittingStatisticsDatabaseTable>;
    getPlayerPitchingStatistics(): Observable<PlayerPitchingStatisticsDatabaseTable>;
}
