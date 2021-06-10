import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { StatisticsService } from './statistics.service';
import { RequestServiceMock } from '../testClasses/request-service-mock';
import { PlayerHittingStatisticsDatabaseTable } from '../in-memory-data-service/player-hitting-statistics-database-table';
import { PlayerPitchingStatisticsDatabaseTable } from '../in-memory-data-service/player-pitching-statistics-database-table';

describe('StatisticsService', () => {
  let statisticsService: StatisticsService;
  let requestServiceMock: RequestServiceMock;

  beforeEach(() => {
    requestServiceMock = new RequestServiceMock();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: 'IRequestService',
          useValue: requestServiceMock
        }
      ]
    });
    statisticsService = TestBed.inject(StatisticsService);
  });

  it('should be created', () => {
    expect(statisticsService).toBeTruthy();
  });

  describe('getPlayerHittingStatistics', () => {
    it('should request the statistics', () => {
      statisticsService.getPlayerHittingStatistics();

      expect(requestServiceMock.get.callCount).toBe(1);
      expect(requestServiceMock.get.args[0][0]).toBe('api/hittingStatistics');
    });

    it('should return an observable of the requested statistics', (done) => {
      const getStatsError = null;
      const statsFromRequest: PlayerHittingStatisticsDatabaseTable = {
        'Fall 2019-2020': [
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
            GIDP: 1,
            GO: 7,
            AO: 10,
            'GO/AO': '0.70',
            PA: 31,
            BABIP: '0.00', 
            ISO: '0.10', 
            'AB/HR': '0.20', 
            'BB/K': '0.30', 
            'BB%': '0.40', 
            'SO%': '0.50'
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
            GIDP: 3,
            GO: 8,
            AO: 4,
            'GO/AO': '2.00',
            PA: 33,
            BABIP: '0.00', 
            ISO: '0.10', 
            'AB/HR': '0.20', 
            'BB/K': '0.30', 
            'BB%': '0.40', 
            'SO%': '0.50'
          }
        ],
        'Spring 2019': []
      };
      requestServiceMock.getReturnValues.push([getStatsError, statsFromRequest]);

      const playerHittingStatsObservable = statisticsService.getPlayerHittingStatistics();

      playerHittingStatsObservable.pipe(take(1)).subscribe(stats => {
        expect(stats).toBe(statsFromRequest);
        done();
      });
    });

    it('should handle the error if stats could not be retrieved', (done) => {
      const getStatsError = new Error('could not get the stats');
      const statsFromRequest = null;
      requestServiceMock.getReturnValues.push([getStatsError, statsFromRequest]);

      const playerHittingStatsObservable = statisticsService.getPlayerHittingStatistics();

      playerHittingStatsObservable.pipe(take(1)).subscribe({
        next: () => expect(true).toBe(false),
        error: (err) => {
          expect(err).toBe(getStatsError);
          done();
        }
      });
    });
  });

  describe('getPlayerPitchingStatistics', () => {
    it('should request the statistics', () => {
      statisticsService.getPlayerPitchingStatistics();

      expect(requestServiceMock.get.callCount).toBe(1);
      expect(requestServiceMock.get.args[0][0]).toBe('api/pitchingStatistics');
    });

    it('should return an observable of the requested statistics', (done) => {
      const getStatsError = null;
      const statsFromRequest: PlayerPitchingStatisticsDatabaseTable = {
        'Spring 2021': [
          {"#":4,"Player":"real estate","W":0,"L":0,"ERA":".--","G":0,"GS":0,"CG":0,"SHO":0,"SV":0,"SVO":0,"IP":0,"H":0,"R":0,"ER":0,"HR":0,"HB":0,"BB":0,"SO":0,"AB":0,"WHIP":".--","AVG":".---","TBF":0,"NP":0,"P/IP":".--","QS":0,"GF":0,"HLD":0,"IBB":0,"WP":0,"BK":0,"SF":0,"GDP":0,"GO":0,"AO":0,"GO/AO":".--","SO/9":".--","BB/9":".--","K/BB":".--","BABIP":".---","SB":0,"CS":0,"PK":0},
          {"#":6,"Player":"yours truly","W":0,"L":0,"ERA":".--","G":0,"GS":0,"CG":0,"SHO":0,"SV":0,"SVO":0,"IP":0,"H":0,"R":0,"ER":0,"HR":0,"HB":0,"BB":0,"SO":0,"AB":0,"WHIP":".--","AVG":".---","TBF":0,"NP":0,"P/IP":".--","QS":0,"GF":0,"HLD":0,"IBB":0,"WP":0,"BK":0,"SF":0,"GDP":0,"GO":0,"AO":0,"GO/AO":".--","SO/9":".--","BB/9":".--","K/BB":".--","BABIP":".---","SB":0,"CS":0,"PK":0}
        ]
      };
      requestServiceMock.getReturnValues.push([getStatsError, statsFromRequest]);

      const playerPitchingStatsObservable = statisticsService.getPlayerPitchingStatistics();

      playerPitchingStatsObservable.pipe(take(1)).subscribe(stats => {
        expect(stats).toBe(statsFromRequest);
        done();
      });
    });

    it('should handle the error if stats could not be retrieved', (done) => {
      const getStatsError = new Error('could not get the stats');
      const statsFromRequest = null;
      requestServiceMock.getReturnValues.push([getStatsError, statsFromRequest]);

      const playerHittingStatsObservable = statisticsService.getPlayerPitchingStatistics();

      playerHittingStatsObservable.pipe(take(1)).subscribe({
        next: () => expect(true).toBe(false),
        error: (err) => {
          expect(err).toBe(getStatsError);
          done();
        }
      });
    });
  });
});
