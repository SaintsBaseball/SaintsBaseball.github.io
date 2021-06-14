import { StatisticKeyToTooltipMessagePipe } from './statistic-key-to-tooltip-message.pipe';

describe('StatisticKeyToTooltipMessagePipe', () => {
  let pipe: StatisticKeyToTooltipMessagePipe;
  
  beforeEach(() => {
    pipe = new StatisticKeyToTooltipMessagePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
