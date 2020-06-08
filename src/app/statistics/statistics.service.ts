import { Injectable, Inject } from '@angular/core';
import { IStatisticsService } from '../interfaces/i-statistics-service';
import { Observable } from 'rxjs';
import { IRequestService } from '../interfaces/i-request-service';
import { PlayerHittingStatistics } from './player-hitting-statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService implements IStatisticsService {
  constructor(@Inject('IRequestService') private requestService: IRequestService) { }

  getPlayerHittingStatistics(): Observable<PlayerHittingStatistics[]> {
    return this.requestService.get<PlayerHittingStatistics[]>('api/stats');
  }
}
