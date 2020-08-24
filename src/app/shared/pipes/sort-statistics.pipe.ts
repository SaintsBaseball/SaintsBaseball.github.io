import { Pipe, PipeTransform } from '@angular/core';
import { PlayerHittingStatistics } from 'src/app/statistics/player-hitting-statistics';

@Pipe({
  name: 'sortStatistics'
})
export class SortStatisticsPipe implements PipeTransform {
  transform(playerStatisticsToSort: PlayerHittingStatistics[], statisticToSortBy: string): PlayerHittingStatistics[] {
    if (!playerStatisticsToSort || !statisticToSortBy) {
      return playerStatisticsToSort;
    }

    const sortedStatistics = [...playerStatisticsToSort];
    const statisticName = statisticToSortBy.replace('Reverse', '');

    if (statisticToSortBy.includes('#')) {
      sortedStatistics.sort((firstPlayerStatistics, secondPlayerStatistics) => {
        return firstPlayerStatistics[statisticName] - secondPlayerStatistics[statisticName];
      });
    } else if (statisticToSortBy.includes('Player')) {
      sortedStatistics.sort((firstPlayerStatistics, secondPlayerStatistics) => {
        return firstPlayerStatistics[statisticName].localeCompare(secondPlayerStatistics[statisticName]);
      });
    } else {
      sortedStatistics.sort((firstPlayerStatistics, secondPlayerStatistics) => {
        return secondPlayerStatistics[statisticName] - firstPlayerStatistics[statisticName];
      });
    }

    if (statisticToSortBy.includes('Reverse')) {
      sortedStatistics.reverse();
    }

    return sortedStatistics;
  }
}
