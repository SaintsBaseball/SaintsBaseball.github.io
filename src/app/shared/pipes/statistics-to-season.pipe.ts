import { Pipe, PipeTransform } from '@angular/core';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';

@Pipe({
  name: 'statisticsToSeason'
})
export class StatisticsToSeasonPipe implements PipeTransform {
  transform(value: PlayerHittingStatisticsDatabaseTable): string[] {
    return Object.keys(value);
  }
}
