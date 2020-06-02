import { TestBed } from '@angular/core/testing';

import { StatisticsService } from './statistics.service';
import { RequestServiceMock } from '../testClasses/request-service-mock';

describe('StatisticsService', () => {
  let statisticsService: StatisticsService;
  let requestServiceMock: RequestServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: 'IRequestService',
          useClass: RequestServiceMock
        }
      ]
    });
    statisticsService = TestBed.inject(StatisticsService);
    requestServiceMock = TestBed.get('IRequestService')
  });

  it('should be created', () => {
    expect(statisticsService).toBeTruthy();
  });

  describe('getPlayerHittingStatistics', () => {
    it('should request the statistics', () => {
      statisticsService.getPlayerHittingStatistics();

      expect(requestServiceMock.get.callCount).toBe(1);
      expect(requestServiceMock.get.args[0][0]).toBe('api/stats');
    });
  });
});
