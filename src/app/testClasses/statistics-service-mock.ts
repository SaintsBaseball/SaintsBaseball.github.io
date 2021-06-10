import * as sinon from 'sinon';
import { Observable, of, throwError } from 'rxjs';
import { IStatisticsService } from '../interfaces/i-statistics-service';
import { PlayerPitchingStatisticsDatabaseTable } from '../in-memory-data-service/player-pitching-statistics-database-table';

export class StatisticsServiceMock implements IStatisticsService {
  getPlayerHittingStatisticsReturnValues: any[][] = [];

  getPlayerHittingStatistics = sinon.spy(() => {
    const returnValueArray = this.getPlayerHittingStatisticsReturnValues.shift();
    if (!returnValueArray) {
      return of();
    }

    const error = returnValueArray[0];
    const data = returnValueArray[1];

    if (error) {
      return throwError(error);
    }

    return of(data);
  });

  getPlayerPitchingStatistics(): Observable<PlayerPitchingStatisticsDatabaseTable> {
    throw new Error('Method not implemented.');
  }
}
