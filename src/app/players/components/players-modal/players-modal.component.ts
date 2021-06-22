import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerHittingStatistics } from 'app/classes/player-hitting-statistics';

@Component({
  selector: 'players-modal',
  templateUrl: './players-modal.component.html',
  styleUrls: ['./players-modal.component.css']
})
export class PlayersModalComponent {
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data) {
    const playerName = data.playerName;
    const mostRecentSeasonStats: PlayerHittingStatistics = data.playerStats.values().next().value;
    this.buildModalHeader(mostRecentSeasonStats, playerName)
  }

  private buildModalHeader(mostRecentSeasonStats: PlayerHittingStatistics, playerName: string) {
    const playerNumber = mostRecentSeasonStats['#'];
    this.title = `${playerName} #${playerNumber}`;
  }
}
