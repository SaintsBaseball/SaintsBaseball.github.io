import { Pipe, PipeTransform } from '@angular/core';
import { PlayerHittingStatistics } from 'src/app/statistics/player-hitting-statistics';

@Pipe({
  name: 'sortStatistics'
})
export class SortStatisticsPipe implements PipeTransform {
  transform(playerStatisticsToSort: PlayerHittingStatistics[], statisticToSortBy: string): PlayerHittingStatistics[] {
    const sortedStatistics = [...playerStatisticsToSort];

    if (statisticToSortBy === '#') {
      sortedStatistics.sort((firstPlayerStatistics, secondPlayerStatistics) => {
        return firstPlayerStatistics[statisticToSortBy] - secondPlayerStatistics[statisticToSortBy];
      });
    } else if (statisticToSortBy === '# Reverse') {
      sortedStatistics.sort((firstPlayerStatistics, secondPlayerStatistics) => {
        return secondPlayerStatistics['#'] - firstPlayerStatistics['#'];
      });
    } else if (statisticToSortBy === 'Player') {
      sortedStatistics.sort((firstPlayerStatistics, secondPlayerStatistics) => {
        return firstPlayerStatistics[statisticToSortBy].localeCompare(secondPlayerStatistics[statisticToSortBy]);
      });
    } else if (statisticToSortBy === 'Player Reverse') {
      sortedStatistics.sort((firstPlayerStatistics, secondPlayerStatistics) => {
        return secondPlayerStatistics.Player.localeCompare(firstPlayerStatistics.Player);
      });
    } else {
      sortedStatistics.sort((firstPlayerStatistics, secondPlayerStatistics) => {
        return secondPlayerStatistics[statisticToSortBy] - firstPlayerStatistics[statisticToSortBy];
      });
    }

    return sortedStatistics;
  }
}
