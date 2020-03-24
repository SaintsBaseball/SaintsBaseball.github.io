import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  title: string = 'Saints Statistics';

  constructor() { }

  ngOnInit(): void {
  }

}
