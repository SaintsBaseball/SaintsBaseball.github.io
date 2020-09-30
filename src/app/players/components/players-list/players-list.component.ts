import { Component, Input } from '@angular/core';
import { PlayerHittingStatistics } from 'src/app/classes/player-hitting-statistics';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';

@Component({
  selector: 'players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent {
  @Input() playerHittingStatistics: PlayerHittingStatisticsDatabaseTable;

  buildStatsForEachPlayer(playerHittingStatisticsData: PlayerHittingStatisticsDatabaseTable): Map<string, Map<string, PlayerHittingStatistics[]>> {
    const statsForEachPlayer = new Map<string, Map<string, PlayerHittingStatistics[]>>();

    Object.keys(playerHittingStatisticsData).forEach(seasonKey => {
        const statsForASeason = playerHittingStatisticsData[seasonKey];
        statsForASeason.forEach(playerStats => {
            const playerName = playerStats.Player;

            if (!statsForEachPlayer.get(playerName)) {
                statsForEachPlayer.set(playerName, new Map<string, PlayerHittingStatistics[]>());
            }

            const statsForOnePlayer = statsForEachPlayer.get(playerName);
            statsForOnePlayer.set(playerName, playerStats);
        });
    });

    return statsForEachPlayer;
}
}
