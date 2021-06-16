import { Observable, of } from 'rxjs';
import { IStatisticsService } from '../interfaces/i-statistics-service';
import { PlayerPitchingStatisticsDatabaseTable } from '../in-memory-data-service/player-pitching-statistics-database-table';
import { PlayerHittingStatisticsDatabaseTable } from '../in-memory-data-service/player-hitting-statistics-database-table';

export class StatisticsServiceMock implements IStatisticsService {
  getPlayerHittingStatistics(): Observable<PlayerHittingStatisticsDatabaseTable> {
    return of(new PlayerHittingStatisticsDatabaseTable());
  };

  getPlayerPitchingStatistics(): Observable<PlayerPitchingStatisticsDatabaseTable> {
    return of(new PlayerPitchingStatisticsDatabaseTable());
  }
}
