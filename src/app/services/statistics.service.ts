import { Injectable, Inject } from '@angular/core';
import { IStatisticsService } from '../interfaces/i-statistics-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { IRequestService } from '../interfaces/i-request-service';
import { PlayerHittingStatistics } from '../classes/player-hitting-statistics';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService implements IStatisticsService {
  private playerHittingStats$ = new BehaviorSubject<PlayerHittingStatistics[]>([]);

  constructor(@Inject('IRequestService') private requestService: IRequestService) { }

  get playerHittingStats(): Observable<PlayerHittingStatistics[]> {
    return this.playerHittingStats$.asObservable();
  }

  getPlayerHittingStatistics(): void {
    this.requestService.get<PlayerHittingStatistics[]>('api/stats').pipe(take(1)).subscribe(
      stats => this.playerHittingStats$.next(stats)
    );
  }
}
