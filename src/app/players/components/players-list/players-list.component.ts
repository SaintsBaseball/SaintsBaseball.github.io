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

  showModal(playerName: string): void {
    const playerStats = this.statsForEachPlayer.get(playerName);
    const mostRecentSeasonStats = playerStats.values().next().value;
    const playerNumber = mostRecentSeasonStats['#'];
    this.selectedPlayer = `${playerName} #${playerNumber}`;
    this.showPlayerStatsModal = true;
  }

  closeModal(): void {
    this.showPlayerStatsModal = false;
  }
}
