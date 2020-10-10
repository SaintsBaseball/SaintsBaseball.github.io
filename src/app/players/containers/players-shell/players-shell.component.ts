import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import * as fromRoot from 'src/app/state';
import {PlayerHittingStatistics} from '../../../classes/player-hitting-statistics';

@Component({
  selector: 'players-shell',
  templateUrl: './players-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersShellComponent implements OnInit {
  title = 'Saints Players';
  playerHittingStatistics$: Observable<PlayerHittingStatisticsDatabaseTable>;
  errorMessage$: Observable<string>;
  statsForEachPlayer$: Observable<Map<string, Map<string, PlayerHittingStatistics>>>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.playerHittingStatistics$ = this.store.pipe(select(fromRoot.getPlayerHittingStatistics));
    this.errorMessage$ = this.store.pipe(select(fromRoot.getErrorMessage));
    this.statsForEachPlayer$ = this.store.pipe(select(fromRoot.getStatsForEachPlayer));
  }
}
