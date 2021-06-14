import { StatisticKeyToTooltipMessagePipe } from './statistic-key-to-tooltip-message.pipe';

describe('StatisticKeyToTooltipMessagePipe', () => {
  let pipe: StatisticKeyToTooltipMessagePipe;

  beforeEach(() => {
    pipe = new StatisticKeyToTooltipMessagePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return a blank string when an invalid key is passed in', () => {
      const invalidKey = 'I am invalid';

      const result = pipe.transform(invalidKey);

      expect(result).toBe('');
    });

    it('should return the correct tooltip string when a valid key shared between hitting and pitching stats is passed in', () => {
      const validStatisticKeys = ['G', 'R', 'H', 'HR', 'BB', 'SO', 'CS', 'IBB', 'GO/AO', 'BABIP'];
      const expectedTooltipMessages = ['Games', 'Runs', 'Hits', 'Home Runs', 'Walks', 'Strikeouts', 'Caught Stealing', 'Intentional Walks', 'Ground Outs Per Fly Out', 'Average on Balls in Play'];

      for (let i = 0; i < validStatisticKeys.length; i++) {
        const result = pipe.transform(validStatisticKeys[i]);

        expect(result).toBe(expectedTooltipMessages[i]);
      }
    });  

    it('should return the correct tooltip string when a valid hitting stats key is passed in', () => {
      const validStatisticKeys = ['AB', '2B', '3B', 'RBI', 'SB', 'AVG', 'OBP', 'SLG', 'OPS', 'PA', 'HBP', 'SAC', 'SF', 'GIDP', 'XBH', 'TB', 'ISO', 'AB/HR', 'BB/K', 'BB%', 'SO%'];
      const expectedTooltipMessages = ['At Bats', 'Doubles', 'Triples', 'Runs Batted In', 'Stolen Bases', 'Batting Average', 'On-Base Percentage', 'Slugging Percentage', 'On-Base Plus Slugging', 'Plate Appearances', 'Hit By Pitch', 'Sacrifice Bunts', 'Sacrifice Flys', 'Ground Into Double Play', 'Extra Base Hits', 'Total Bases', 'Isolated Power', 'At Bats per Home Run', 'Walk to Strikeout Ratio', 'Walk Percentage', 'Strikeout Percentage'];

      for (let i = 0; i < validStatisticKeys.length; i++) {
        const result = pipe.transform(validStatisticKeys[i]);

        expect(result).toBe(expectedTooltipMessages[i]);
      }
    });  
  });
});
