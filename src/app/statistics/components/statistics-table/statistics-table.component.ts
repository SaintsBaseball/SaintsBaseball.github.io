import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsTableComponent implements OnInit {
  title: string = 'Saints Statistics';

  constructor() { }

  ngOnInit(): void {
  }

}
