import { Component, Input } from '@angular/core';
import { PlayerHittingStatistics } from 'src/app/classes/player-hitting-statistics';

@Component({
  selector: 'players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent {
  @Input() statsForEachPlayer: Map<string, Map<string, PlayerHittingStatistics>>;
  showPlayerStatsModal = false;
  selectedPlayer: string;
  statsHeader: string[];
  statsForEachSeason: any[][];

  public keepOriginalOrder = (a) => a.key;

  showModal(playerName: string): void {
    const playerStats = this.statsForEachPlayer.get(playerName);
    const mostRecentSeasonStats: PlayerHittingStatistics = playerStats.values().next().value;
    
    const playerNumber = mostRecentSeasonStats['#'];
    this.selectedPlayer = `${playerName} #${playerNumber}`;

    this.statsHeader = [];
    Object.keys(mostRecentSeasonStats).forEach(statsKey => {
      if (statsKey === 'Player' || statsKey === '#') {
        return;
      }

      this.statsHeader.push(statsKey);
    });

    this.statsForEachSeason = [];
    playerStats.forEach((statsForOneSeason, season) => {
      const statsAndSeasonToDisplay = [season];
      Object.keys(statsForOneSeason).forEach(statsKey => {
        if (statsKey === 'Player' || statsKey === '#') {
          return;
        }

        statsAndSeasonToDisplay.push(statsForOneSeason[statsKey]);
      });

      this.statsForEachSeason.push(statsAndSeasonToDisplay);
    });

    this.showPlayerStatsModal = true;
  }

  closeModal(): void {
    this.showPlayerStatsModal = false;
  }
}
