import { Pipe, PipeTransform } from '@angular/core';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';

@Pipe({
  name: 'playerStatisticsToStatisticKeys'
})
export class PlayerStatisticsToStatisticKeys implements PipeTransform {

  transform(value: PlayerHittingStatisticsDatabaseTable, season: string): string[] {
    if (!value[season] || value[season].length === 0) {
      return [];
    }
    return Object.keys(value[season][0]);
  }
}
