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
  playerNameInModal: string;

  showModal(playerName: string): void {
    this.playerNameInModal = playerName;
    this.showPlayerStatsModal = true;
  }

  closeModal(): void {
    this.showPlayerStatsModal = false;
  }
}
