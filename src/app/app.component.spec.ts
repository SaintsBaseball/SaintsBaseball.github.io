import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { take } from 'rxjs/operators';
import { StoreModule, select, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { StatisticsServiceMock } from './testClasses/statistics-service-mock';
import { AppEffects } from './state/app.effects';
import { PlayerHittingStatisticsDatabaseTable } from './in-memory-data-service/player-hitting-statistics-database-table';
import * as fromRoot from './state';
import { reducer } from './state/app.reducer';
import {PlayerHittingStatistics} from './classes/player-hitting-statistics';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let nativeElement;
  let statisticsServiceMock: StatisticsServiceMock;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    statisticsServiceMock = new StatisticsServiceMock();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          appState: reducer
        }),
        EffectsModule.forRoot([AppEffects])
      ],
      providers: [
        {
          provide: 'IStatisticsService',
          useValue: statisticsServiceMock
        }
      ],
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    store = TestBed.inject(Store);
  }));

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should have the router outlet', () => {
    expect(nativeElement.querySelector('router-outlet')).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load the player hitting statistics', () => {
      statisticsServiceMock.getPlayerHittingStatistics.resetHistory();

      appComponent.ngOnInit();

      expect(statisticsServiceMock.getPlayerHittingStatistics.callCount).toBe(1);
    });

    it('should update the statistics on successful load', (done) => {
      const getPlayerHittingStatisticsError = null;
      const statisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
      statisticsToReturn['Fall 2019-2020'] = [
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
      statisticsToReturn['Spring 2019'] = [];
      statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);

      appComponent.ngOnInit();

      store.pipe(select(fromRoot.getPlayerHittingStatistics, take(1))).subscribe(stats => {
        expect(stats).toBe(statisticsToReturn);
        done();
      });
    });

    it('should populate the error message if failed to load statistics', (done) => {
      const getPlayerHittingStatisticsError = new Error('Some error');
      const statisticsToReturn = null;
      statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);

      appComponent.ngOnInit();

      store.pipe(select(fromRoot.getPlayerHittingStatistics, take(1))).subscribe(stats => {
        const defaultStats = new PlayerHittingStatisticsDatabaseTable();
        expect(stats).toEqual(defaultStats);

        store.pipe(select(fromRoot.getStatsForEachPlayer, take(1))).subscribe(statsForEachPlayer => {
          const defaultStatsForEachPlayer = new Map<string, Map<string, PlayerHittingStatistics>>();
          expect(statsForEachPlayer).toEqual(defaultStatsForEachPlayer);

          store.pipe(select(fromRoot.getErrorMessage, take(1))).subscribe(errorMessage => {
            expect(errorMessage).toBe('Could not load statistics');
            done();
          });
        });
      });
    });

    it('should update the statistics for each player on successful load', (done) => {
      const getPlayerHittingStatisticsError = null;
      const statisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
      statisticsToReturn['Fall 2019-2020'] = [
        {
          '#': 1,
          Player: 'Beta',
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
          Player: 'Charlie',
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
      statisticsToReturn['Spring 2019'] = [
        {
          '#': 4,
          Player: 'Beta',
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
          GDP: 1,
          GO: 7,
          AO: 10,
          GO_AO: '0.70',
          PA: 31
        },
        {
          '#': 3,
          Player: 'Alpha',
          G: 1,
          AB: 4,
          R: 5,
          H: 5,
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
          GDP: 1,
          GO: 7,
          AO: 10,
          GO_AO: '0.70',
          PA: 31
        }
      ];
      statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);

      appComponent.ngOnInit();

      store.pipe(select(fromRoot.getStatsForEachPlayer, take(1))).subscribe(statsForEachPlayer => {
        const expectedStatsForEachPlayer = new Map<string, Map<string, PlayerHittingStatistics>>();
        const statsForAlpha = new Map<string, PlayerHittingStatistics>();
        statsForAlpha.set('Spring 2019', statisticsToReturn['Spring 2019'][1]);
        const statsForBeta = new Map<string, PlayerHittingStatistics>();
        statsForBeta.set('Fall 2019-2020', statisticsToReturn['Fall 2019-2020'][0]);
        statsForBeta.set('Spring 2019', statisticsToReturn['Spring 2019'][0]);
        const statsForCharlie = new Map<string, PlayerHittingStatistics>();
        statsForCharlie.set('Fall 2019-2020', statisticsToReturn['Fall 2019-2020'][1]);
        expectedStatsForEachPlayer.set('Alpha', statsForAlpha);
        expectedStatsForEachPlayer.set('Beta', statsForBeta);
        expectedStatsForEachPlayer.set('Charlie', statsForCharlie);

        expect(statsForEachPlayer).toEqual(expectedStatsForEachPlayer);
        done();
      });
    });
  });
});
