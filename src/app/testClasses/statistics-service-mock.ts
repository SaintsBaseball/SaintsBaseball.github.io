import * as sinon from 'sinon';
import { of, throwError } from 'rxjs';
import { IStatisticsService } from '../interfaces/i-statistics-service';

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
}
