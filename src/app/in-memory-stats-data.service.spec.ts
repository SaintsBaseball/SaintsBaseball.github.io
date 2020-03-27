import { TestBed } from '@angular/core/testing';

import { InMemoryStatsDataService } from './in-memory-stats-data.service';
import { PlayerHittingStatistics } from './classes/player-hitting-statistics';

describe('InMemoryDataServiceService', () => {
  let inMemoryStatsDataService: InMemoryStatsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    inMemoryStatsDataService = TestBed.inject(InMemoryStatsDataService);
  });

  it('should be created', () => {
    expect(inMemoryStatsDataService).toBeTruthy();
  });

  describe('createDb', () => {
    it('should create the database with a list of player hitting statistics', () => {
      const actualDatabase = inMemoryStatsDataService.createDb();

      expect(typeof actualDatabase).toBe('object');
      expect(typeof actualDatabase['Fall 2019-2020'].length).toBeTruthy();
      expect(actualDatabase['Fall 2019-2020'][0]).toBeInstanceOf(PlayerHittingStatistics);
    });
  });
});
