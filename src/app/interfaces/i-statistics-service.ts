import { PlayerHittingStatistics } from '../statistics/player-hitting-statistics';
import { Observable } from 'rxjs';

export interface IStatisticsService {
    getPlayerHittingStatistics(): Observable<PlayerHittingStatistics[]>;
}
