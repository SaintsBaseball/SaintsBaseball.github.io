import { Pipe, PipeTransform } from '@angular/core';
import { PlayerHittingStatistics } from 'src/app/statistics/player-hitting-statistics';

@Pipe({
  name: 'sortStatistics'
})
export class SortStatisticsPipe implements PipeTransform {
  transform(playerStatisticsToSort: PlayerHittingStatistics[], statisticToSortBy: string): PlayerHittingStatistics[] {
    const sortedStatistics = [...playerStatisticsToSort];
    sortedStatistics.sort((firstPlayerStatistics, secondPlayerStatistics) => {
      return firstPlayerStatistics[statisticToSortBy].localeCompare(secondPlayerStatistics[statisticToSortBy]);
    });

    return sortedStatistics;
  }
}
