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
  });
});
