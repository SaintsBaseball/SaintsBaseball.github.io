import { SortStatisticsPipe } from './sort-statistics.pipe';
import { PlayerHittingStatistics } from 'src/app/statistics/player-hitting-statistics';

describe('SortStatisticsPipe', () => {
  let sortStatisticsPipe: SortStatisticsPipe;

  beforeEach(() => {
    sortStatisticsPipe = new SortStatisticsPipe();
  });

  it('create an instance', () => {
    expect(sortStatisticsPipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return the statistics sorted by the player name', () => {
      const firstPlayer = {
        "#": 3, "Player": "this is my bro", "G": 17, "AB": 63, "R": 9, "H": 19, "2B": 1, "3B": 0, "HR": 0, "RBI": 11, "BB": 7, "SO": 19, "SB": 3, "CS": 1, "AVG": "0.302", "OBP": "0.380", "SLG": "0.317", "OPS": "0.697", "IBB": 0, "HBP": 1, "SAC": 0, "SF": 0, "TB": 20, "XBH": 1, "GDP": 1, "GO": 6, "AO": 12, "GO_AO": "0.50", "PA": 71
      };
      const secondPlayer = {
        "#": 4, "Player": "real estate", "G": 12, "AB": 44, "R": 13, "H": 15, "2B": 1, "3B": 1, "HR": 1, "RBI": 12, "BB": 6, "SO": 15, "SB": 1, "CS": 0, "AVG": "0.341", "OBP": "0.431", "SLG": "0.477", "OPS": "0.908", "IBB": 0, "HBP": 1, "SAC": 1, "SF": 0, "TB": 21, "XBH": 3, "GDP": 0, "GO": 7, "AO": 7, "GO_AO": "1.00", "PA": 52
      };
      const playerStatisticsToSort = [firstPlayer, secondPlayer];
      const statisticToSortBy = 'Player';

      const results = sortStatisticsPipe.transform(playerStatisticsToSort, statisticToSortBy);

      const expected = [secondPlayer, firstPlayer];
      expect(results).toEqual(expected);
    });
  });
});
