import { Injectable, Inject } from '@angular/core';
import { IStatisticsService } from '../interfaces/i-statistics-service';
import { IRequestService } from '../interfaces/i-request-service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService implements IStatisticsService {

  constructor(@Inject('IRequestService') private requestService: IRequestService) { }


  getPlayerHittingStatistics(): void {
    this.requestService.get('api/stats');
  }
}
