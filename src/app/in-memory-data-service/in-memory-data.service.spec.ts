import { TestBed } from '@angular/core/testing';

import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
  let inMemoryStatsDataService: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    inMemoryStatsDataService = TestBed.inject(InMemoryDataService);
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
