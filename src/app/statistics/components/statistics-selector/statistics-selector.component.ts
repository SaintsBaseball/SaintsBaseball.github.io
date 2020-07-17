import { Component, Input } from '@angular/core';
import { StatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';

@Component({
  selector: 'statistics-selector',
  templateUrl: './statistics-selector.component.html',
  styleUrls: ['./statistics-selector.component.css']
})
export class StatisticsSelectorComponent {
  @Input() statistics: StatisticsDatabaseTable;
}
