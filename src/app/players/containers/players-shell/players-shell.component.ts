import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'players-shell',
  templateUrl: './players-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersShellComponent implements OnInit {
  title: string = 'Saints Players';

  constructor() { }

  ngOnInit(): void {
  }

}
