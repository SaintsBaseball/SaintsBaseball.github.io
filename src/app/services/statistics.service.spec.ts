import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { StatisticsService } from './statistics.service';
import { RequestServiceMock } from '../testClasses/request-service-mock';
import { PlayerHittingStatistics } from '../classes/player-hitting-statistics';

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

    it('should save the requested statistics', () => {
      const statsFromRequest: PlayerHittingStatistics[] = [
        {
          '#': 1,
          Player: 'name',
          G: 1,
          AB: 4,
          R: 5,
          H: 5,
          '2B': 2,
          '3B': 2,
          HR: 0,
          RBI: 3,
          BB: 7,
          SO: 10,
          SB: 4,
          CS: 2,
          AVG: '0.250',
          OBP: '0.300',
          SLG: '0.310',
          OPS: '0.610',
          IBB: 0,
          HBP: 1,
          SAC: 3,
          SF: 2,
          TB: 21,
          XBH: 4,
          GDP: 1,
          GO: 7,
          AO: 10,
          GO_AO: '0.70',
          PA: 31
        },
        {
          '#': 2,
          Player: 'other name',
          G: 2,
          AB: 6,
          R: 8,
          H: 2,
          '2B': 3,
          '3B': 2,
          HR: 1,
          RBI: 4,
          BB: 10,
          SO: 0,
          SB: 2,
          CS: 1,
          AVG: '0.281',
          OBP: '0.312',
          SLG: '0.313',
          OPS: '0.625',
          IBB: 2,
          HBP: 3,
          SAC: 2,
          SF: 1,
          TB: 24,
          XBH: 2,
          GDP: 3,
          GO: 8,
          AO: 4,
          GO_AO: '2.00',
          PA: 33
        }
      ];
      requestServiceMock.getReturnValues.push(statsFromRequest);

      statisticsService.getPlayerHittingStatistics();

      statisticsService.playerHittingStats.pipe(take(1)).subscribe(stats => {
        expect(stats).toBe(statsFromRequest);
      });
    });
  });
});
