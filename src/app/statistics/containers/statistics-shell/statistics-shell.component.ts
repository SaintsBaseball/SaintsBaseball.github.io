import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'statistics-shell',
  templateUrl: './statistics-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsShellComponent implements OnInit {
  title: string = 'Saints Statistics';

  constructor() { }

  ngOnInit(): void {
  }

}
