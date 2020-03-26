import { TestBed } from '@angular/core/testing';

import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataServiceService', () => {
  let inMemoryDataService: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    inMemoryDataService = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(inMemoryDataService).toBeTruthy();
  });
});
