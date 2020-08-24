import { Pipe, PipeTransform } from '@angular/core';
import { StatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';

@Pipe({
  name: 'statisticsToSeason'
})
export class StatisticsToSeasonPipe implements PipeTransform {
  transform(value: StatisticsDatabaseTable): string[] {
    return Object.keys(value);
  }
}
