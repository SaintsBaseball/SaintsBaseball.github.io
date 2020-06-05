import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnInit {
  title: string = 'Saints Statistics';

  constructor() { }

  ngOnInit(): void {
  }

}
