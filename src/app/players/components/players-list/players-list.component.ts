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
  modalHeader: string;
  modalTableHeader: string[];
  modalTableBody: any[][];

  showModal(playerName: string): void {
    const playerStats = this.statsForEachPlayer.get(playerName);
    const mostRecentSeasonStats: PlayerHittingStatistics = playerStats.values().next().value;

    this.buildModalHeader(mostRecentSeasonStats, playerName);
    this.buildModalTableHeader(mostRecentSeasonStats);
    this.buildModalTableBody(playerStats);

    this.showPlayerStatsModal = true;
  }

  closeModal(): void {
    this.showPlayerStatsModal = false;
  }

  private buildModalHeader(mostRecentSeasonStats: PlayerHittingStatistics, playerName: string) {
    const playerNumber = mostRecentSeasonStats['#'];
    this.modalHeader = `${playerName} #${playerNumber}`;
  }
  
  private buildModalTableHeader(mostRecentSeasonStats: PlayerHittingStatistics) {
    this.modalTableHeader = ['Season'];
    Object.keys(mostRecentSeasonStats).forEach(statsKey => {
      if (statsKey === 'Player' || statsKey === '#') {
        return;
      }

      this.modalTableHeader.push(statsKey);
    });
  }

  private buildModalTableBody(playerStats: Map<string, PlayerHittingStatistics>) {
    this.modalTableBody = [];
    playerStats.forEach((statsForOneSeason, season) => {
      const statsAndSeasonToDisplay = [season];
      Object.keys(statsForOneSeason).forEach(statsKey => {
        if (statsKey === 'Player' || statsKey === '#') {
          return;
        }

        statsAndSeasonToDisplay.push(statsForOneSeason[statsKey]);
      });

      this.modalTableBody.push(statsAndSeasonToDisplay);
    });
  }
}
