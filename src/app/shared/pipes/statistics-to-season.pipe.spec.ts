import { StatisticsToSeasonPipe } from './statistics-to-season.pipe';
import { StatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';

describe('StatisticsToSeasonPipe', () => {
  let statisticsToSeasonPipe: StatisticsToSeasonPipe;

  beforeEach(() => {
    statisticsToSeasonPipe = new StatisticsToSeasonPipe();
  });

  it('create an instance', () => {
    expect(statisticsToSeasonPipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should transform an empty table to an empty string array', () => {
      const statistics = new StatisticsDatabaseTable();

      const result = statisticsToSeasonPipe.transform(statistics);

      expect(result).toEqual([]);
    });

    it('should transform a populated table to a string array with the season names', () => {
      const statistics = new StatisticsDatabaseTable();
      statistics["Fall 2019-2020"] = [];
      statistics["Spring 2019"] = [];

      const result = statisticsToSeasonPipe.transform(statistics);

      expect(result).toEqual(["Fall 2019-2020", "Spring 2019"]);
    });
  });
});
