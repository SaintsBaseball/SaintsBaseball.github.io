import { StatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';
import { PlayerStatisticsToStatisticKeys } from './player-statistics-to-statistic-keys.pipe';

describe('PlayerStatisticsToStatisticKeys', () => {
  let playerStatisticsToStatisticKeys: PlayerStatisticsToStatisticKeys;

  beforeEach(() => {
    playerStatisticsToStatisticKeys = new PlayerStatisticsToStatisticKeys();
  });

  it('create an instance', () => {
    expect(playerStatisticsToStatisticKeys).toBeTruthy();
  });

  describe('transform', () => {
    it('should transform an empty table to an empty string array', () => {
      const statistics = new StatisticsDatabaseTable();
      const currentSeason = 'currentSeason';

      const result = playerStatisticsToStatisticKeys.transform(statistics, currentSeason);

      expect(result).toEqual([]);
    });

    it('should transform a populated table to an empty string array when an invalid season name is passed in', () => {
      const statistics = new StatisticsDatabaseTable();
      statistics["Fall 2019-2020"] = [
        {
          "#": 6, "Player": "me", "G": 14, "AB": 54, "R": 11, "H": 21, "2B": 1, "3B": 0, "HR": 0, "RBI": 9, "BB": 10, "SO": 6, "SB": 3, "CS": 1, "AVG": "0.389", "OBP": "0.500", "SLG": "0.407", "OPS": "0.907", "IBB": 0, "HBP": 2, "SAC": 2, "SF": 0, "TB": 22, "XBH": 1, "GDP": 0, "GO": 17, "AO": 4, "GO_AO": "4.25", "PA": 68
        },
        {
          "#": 8, "Player": "helmet slammer", "G": 11, "AB": 36, "R": 7, "H": 6, "2B": 1, "3B": 0, "HR": 0, "RBI": 4, "BB": 9, "SO": 4, "SB": 5, "CS": 0, "AVG": "0.167", "OBP": "0.347", "SLG": "0.194", "OPS": "0.541", "IBB": 0, "HBP": 2, "SAC": 1, "SF": 2, "TB": 7, "XBH": 1, "GDP": 0, "GO": 8, "AO": 20, "GO_AO": "0.40", "PA": 50
        }
      ];
      statistics["Spring 2019"] = [
        {
          "#": 3, "Player": "my bro", "G": 17, "AB": 63, "R": 9, "H": 19, "2B": 1, "3B": 0, "HR": 0, "RBI": 11, "BB": 7, "SO": 19, "SB": 3, "CS": 1, "AVG": "0.302", "OBP": "0.380", "SLG": "0.317", "OPS": "0.697", "IBB": 0, "HBP": 1, "SAC": 0, "SF": 0, "TB": 20, "XBH": 1, "GDP": 1, "GO": 6, "AO": 12, "GO_AO": "0.50", "PA": 71
        },
        {
          "#": 4, "Player": "real estate", "G": 12, "AB": 44, "R": 13, "H": 15, "2B": 1, "3B": 1, "HR": 1, "RBI": 12, "BB": 6, "SO": 15, "SB": 1, "CS": 0, "AVG": "0.341", "OBP": "0.431", "SLG": "0.477", "OPS": "0.908", "IBB": 0, "HBP": 1, "SAC": 1, "SF": 0, "TB": 21, "XBH": 3, "GDP": 0, "GO": 7, "AO": 7, "GO_AO": "1.00", "PA": 52
        }
      ];
      const currentSeason = 'invalidSeason';

      const result = playerStatisticsToStatisticKeys.transform(statistics, currentSeason);

      expect(result).toEqual([]);
    });

    it('should transform a populated table to an empty string array when there are no statistics in given season', () => {
      const statistics = new StatisticsDatabaseTable();
      statistics["Fall 2019-2020"] = [
        {
          "#": 6, "Player": "me", "G": 14, "AB": 54, "R": 11, "H": 21, "2B": 1, "3B": 0, "HR": 0, "RBI": 9, "BB": 10, "SO": 6, "SB": 3, "CS": 1, "AVG": "0.389", "OBP": "0.500", "SLG": "0.407", "OPS": "0.907", "IBB": 0, "HBP": 2, "SAC": 2, "SF": 0, "TB": 22, "XBH": 1, "GDP": 0, "GO": 17, "AO": 4, "GO_AO": "4.25", "PA": 68
        },
        {
          "#": 8, "Player": "helmet slammer", "G": 11, "AB": 36, "R": 7, "H": 6, "2B": 1, "3B": 0, "HR": 0, "RBI": 4, "BB": 9, "SO": 4, "SB": 5, "CS": 0, "AVG": "0.167", "OBP": "0.347", "SLG": "0.194", "OPS": "0.541", "IBB": 0, "HBP": 2, "SAC": 1, "SF": 2, "TB": 7, "XBH": 1, "GDP": 0, "GO": 8, "AO": 20, "GO_AO": "0.40", "PA": 50
        }
      ];
      statistics["Spring 2019"] = [];
      const currentSeason = 'Spring 2019';

      const result = playerStatisticsToStatisticKeys.transform(statistics, currentSeason);

      expect(result).toEqual([]);
    });

    it('should transform a populated table to a string array with the statistic keys when a valid season is passed in', () => {
      const statistics = new StatisticsDatabaseTable();
      statistics["Fall 2019-2020"] = [
        {
          "#": 6, "Player": "me", "G": 14, "AB": 54, "R": 11, "H": 21, "2B": 1, "3B": 0, "HR": 0, "RBI": 9, "BB": 10, "SO": 6, "SB": 3, "CS": 1, "AVG": "0.389", "OBP": "0.500", "SLG": "0.407", "OPS": "0.907", "IBB": 0, "HBP": 2, "SAC": 2, "SF": 0, "TB": 22, "XBH": 1, "GDP": 0, "GO": 17, "AO": 4, "GO_AO": "4.25", "PA": 68
        },
        {
          "#": 8, "Player": "helmet slammer", "G": 11, "AB": 36, "R": 7, "H": 6, "2B": 1, "3B": 0, "HR": 0, "RBI": 4, "BB": 9, "SO": 4, "SB": 5, "CS": 0, "AVG": "0.167", "OBP": "0.347", "SLG": "0.194", "OPS": "0.541", "IBB": 0, "HBP": 2, "SAC": 1, "SF": 2, "TB": 7, "XBH": 1, "GDP": 0, "GO": 8, "AO": 20, "GO_AO": "0.40", "PA": 50
        }
      ];
      statistics["Spring 2019"] = [
        {
          "#": 3, "Player": "my bro", "G": 17, "AB": 63, "R": 9, "H": 19, "2B": 1, "3B": 0, "HR": 0, "RBI": 11, "BB": 7, "SO": 19, "SB": 3, "CS": 1, "AVG": "0.302", "OBP": "0.380", "SLG": "0.317", "OPS": "0.697", "IBB": 0, "HBP": 1, "SAC": 0, "SF": 0, "TB": 20, "XBH": 1, "GDP": 1, "GO": 6, "AO": 12, "GO_AO": "0.50", "PA": 71
        },
        {
          "#": 4, "Player": "real estate", "G": 12, "AB": 44, "R": 13, "H": 15, "2B": 1, "3B": 1, "HR": 1, "RBI": 12, "BB": 6, "SO": 15, "SB": 1, "CS": 0, "AVG": "0.341", "OBP": "0.431", "SLG": "0.477", "OPS": "0.908", "IBB": 0, "HBP": 1, "SAC": 1, "SF": 0, "TB": 21, "XBH": 3, "GDP": 0, "GO": 7, "AO": 7, "GO_AO": "1.00", "PA": 52
        }
      ];
      const currentSeason = 'Fall 2019-2020';

      const result = playerStatisticsToStatisticKeys.transform(statistics, currentSeason);

      const expectedStatisticKeys = ["#", "Player", "G", "AB", "R", "H", "2B", "3B", "HR", "RBI", "BB", "SO", "SB", "CS", "AVG", "OBP", "SLG", "OPS", "IBB", "HBP", "SAC", "SF", "TB", "XBH", "GDP", "GO", "AO", "GO_AO", "PA"];
      expect(result).toEqual(expectedStatisticKeys);
    });
  });
});
