import { TestBed } from '@angular/core/testing';

import { StatisticsService } from './statistics.service';

describe('StatisticsServiceService', () => {
  let statisticsService: StatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    statisticsService = TestBed.inject(StatisticsService);
  });

  it('should be created', () => {
    expect(statisticsService).toBeTruthy();
  });
});
