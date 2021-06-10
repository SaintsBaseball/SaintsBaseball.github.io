import { Injectable, Inject } from '@angular/core';
import { IStatisticsService } from '../interfaces/i-statistics-service';
import { Observable } from 'rxjs';
import { IRequestService } from '../interfaces/i-request-service';
import { PlayerHittingStatisticsDatabaseTable } from '../in-memory-data-service/player-hitting-statistics-database-table';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService implements IStatisticsService {
  constructor(@Inject('IRequestService') private requestService: IRequestService) { }

  getPlayerHittingStatistics(): Observable<PlayerHittingStatisticsDatabaseTable> {
    return this.requestService.get<PlayerHittingStatisticsDatabaseTable>('api/hittingStatistics');
  }
}
