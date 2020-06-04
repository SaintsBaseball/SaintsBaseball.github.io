import { PlayerHittingStatistics } from '../classes/player-hitting-statistics';
import { Observable } from 'rxjs';

export interface IStatisticsService {
    getPlayerHittingStatistics(): Observable<PlayerHittingStatistics[]>;
}
