import { Pipe, PipeTransform } from '@angular/core';
import { IPlayerStatisticsDatabaseTable } from 'src/app/in-memory-data-service/i-player-statistics-database-table';

@Pipe({
  name: 'statisticsToSeason'
})
export class StatisticsToSeasonPipe implements PipeTransform {
  transform(value: IPlayerStatisticsDatabaseTable): string[] {
    return Object.keys(value);
  }
}
