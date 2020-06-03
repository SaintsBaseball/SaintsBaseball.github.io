import { TestBed } from '@angular/core/testing';

import { InMemoryStatsDataService } from './in-memory-stats-data.service';

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
    it('should create the database with the statistics', () => {
      const actualDatabase = inMemoryStatsDataService.createDb();

      expect(typeof actualDatabase).toBe('object');
      expect(actualDatabase.stats).toBeTruthy();
    });
  });
});
