import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { StatisticsServiceMock } from './testClasses/statistics-service-mock';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './state/app.effects';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let nativeElement;
  let statisticsServiceMock: StatisticsServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([AppEffects])
      ],
      providers: [
        {
          provide: 'IStatisticsService',
          useClass: StatisticsServiceMock
        }
      ],
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    statisticsServiceMock = TestBed.get('IStatisticsService');
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

    // it('should update the statistics on successful load', (done) => {
    //   const getPlayerHittingStatisticsError = null;
    //   const statisticsToReturn = new StatisticsDatabaseTable();
    //   statisticsToReturn["Fall 2019-2020"] = [
    //     {
    //       '#': 1,
    //       Player: 'name',
    //       G: 1,
    //       AB: 4,
    //       R: 5,
    //       H: 5,
    //       '2B': 2,
    //       '3B': 2,
    //       HR: 0,
    //       RBI: 3,
    //       BB: 7,
    //       SO: 10,
    //       SB: 4,
    //       CS: 2,
    //       AVG: '0.250',
    //       OBP: '0.300',
    //       SLG: '0.310',
    //       OPS: '0.610',
    //       IBB: 0,
    //       HBP: 1,
    //       SAC: 3,
    //       SF: 2,
    //       TB: 21,
    //       XBH: 4,
    //       GDP: 1,
    //       GO: 7,
    //       AO: 10,
    //       GO_AO: '0.70',
    //       PA: 31
    //     },
    //     {
    //       '#': 2,
    //       Player: 'other name',
    //       G: 2,
    //       AB: 6,
    //       R: 8,
    //       H: 2,
    //       '2B': 3,
    //       '3B': 2,
    //       HR: 1,
    //       RBI: 4,
    //       BB: 10,
    //       SO: 0,
    //       SB: 2,
    //       CS: 1,
    //       AVG: '0.281',
    //       OBP: '0.312',
    //       SLG: '0.313',
    //       OPS: '0.625',
    //       IBB: 2,
    //       HBP: 3,
    //       SAC: 2,
    //       SF: 1,
    //       TB: 24,
    //       XBH: 2,
    //       GDP: 3,
    //       GO: 8,
    //       AO: 4,
    //       GO_AO: '2.00',
    //       PA: 33
    //     }
    //   ];
    //   statisticsToReturn["Spring 2019"] = [];

    //   statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);

    //   statisticsShellComponent.ngOnInit();

    //   statisticsShellComponent.statistics$.pipe(take(1)).subscribe(stats => {
    //     expect(stats).toBe(statisticsToReturn);
    //     done();
    //   });
    // });

    // it('should populate the error message if failed to load statistics', (done) => {
    //   const getPlayerHittingStatisticsError = new Error('Some error');
    //   const statisticsToReturn = null;
    //   statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);

    //   statisticsShellComponent.ngOnInit();

    //   const defaultStats = new StatisticsDatabaseTable();
    //   statisticsShellComponent.statistics$.pipe(take(1)).subscribe(stats => {
    //     expect(stats).toEqual(defaultStats);

    //     statisticsShellComponent.errorMessage$.pipe(take(1)).subscribe(errorMessage => {
    //       expect(errorMessage).toBe('Could not load statistics');
    //       done();
    //     });
    //   });
    // });

    // it('should get the current season', (done) => {
    //   statisticsShellComponent.ngOnInit();

    //   statisticsShellComponent.currentSeason$.pipe(take(1)).subscribe(currentSeason => {
    //     expect(currentSeason).toBe('Season');
    //     done();
    //   });
    // });
  });
});
