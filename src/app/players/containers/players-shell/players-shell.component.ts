import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import * as fromRoot from 'src/app/state';

@Component({
  selector: 'players-shell',
  templateUrl: './players-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersShellComponent implements OnInit {
  title: string = 'Saints Players';
  playerHittingStatistics$: Observable<PlayerHittingStatisticsDatabaseTable>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.playerHittingStatistics$ = this.store.pipe(select(fromRoot.getPlayerHittingStatistics));
    this.errorMessage$ = this.store.pipe(select(fromRoot.getErrorMessage));
  }
}
