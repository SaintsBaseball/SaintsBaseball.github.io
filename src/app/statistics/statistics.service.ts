import { Injectable, Inject } from '@angular/core';
import { IStatisticsService } from '../interfaces/i-statistics-service';
import { Observable } from 'rxjs';
import { IRequestService } from '../interfaces/i-request-service';
import { StatisticsDatabaseTable } from '../in-memory-data-service/statistics-database-table';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService implements IStatisticsService {
  constructor(@Inject('IRequestService') private requestService: IRequestService) { }

  getPlayerHittingStatistics(): Observable<StatisticsDatabaseTable> {
    return this.requestService.get<StatisticsDatabaseTable>('api/stats');
  }
}
