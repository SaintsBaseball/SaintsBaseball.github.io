import { PlayerHittingStatistics } from '../classes/player-hitting-statistics';
import { Observable } from 'rxjs';

export interface IStatisticsService {
    playerHittingStats: Observable<PlayerHittingStatistics[]>;
    getPlayerHittingStatistics(): void;
}
