import { StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsShellComponent } from './statistics-shell.component';
import { StatisticsSelectorComponent } from '../../components/statistics-selector/statistics-selector.component';
import { StatisticsTableComponent } from '../../components/statistics-table/statistics-table.component';
import { StatisticsServiceMock } from 'src/app/testClasses/statistics-service-mock';
import { EffectsModule } from '@ngrx/effects';
import { StatisticsEffects } from '../../state/statistic.effects';
import { StatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';
import { take } from 'rxjs/operators';
import { reducer } from '../../state/statistic.reducer';

describe('StatisticsShellComponent', () => {
  let statisticsShellComponent: StatisticsShellComponent;
  let fixture: ComponentFixture<StatisticsShellComponent>;
  let nativeElement;
  let statisticsServiceMock: StatisticsServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatisticsShellComponent,
        StatisticsSelectorComponent,
        StatisticsTableComponent
      ],
      providers: [
        {
          provide: 'IStatisticsService',
          useClass: StatisticsServiceMock
        }
      ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('statistics', reducer),
        EffectsModule.forRoot([StatisticsEffects])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsShellComponent);
    statisticsShellComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    statisticsServiceMock = TestBed.get('IStatisticsService');
  });

  it('should create', () => {
    expect(statisticsShellComponent).toBeTruthy();
  });

  it('should have the title in the header', () => {
    expect(statisticsShellComponent.title).toBe('Saints Statistics');
    expect(nativeElement.querySelector('h1').textContent).toBe(statisticsShellComponent.title);
  });

  it('should have the statistics selector', () => {
    expect(nativeElement.querySelector('statistics-selector')).toBeTruthy();
  });

  it('should have the statistics table', () => {
    expect(nativeElement.querySelector('statistics-table')).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load the player hitting statistics', () => {
      statisticsServiceMock.getPlayerHittingStatistics.resetHistory();

      statisticsShellComponent.ngOnInit();

      expect(statisticsServiceMock.getPlayerHittingStatistics.callCount).toBe(1);
    });

    it('should update the statistics on successful load', (done) => {
      const getPlayerHittingStatisticsError = null;
      const statisticsToReturn: StatisticsDatabaseTable = {
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
        ],
        'Spring 2019': []
      };
      statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);

      statisticsShellComponent.ngOnInit();

      statisticsShellComponent.statistics$.pipe(take(1)).subscribe(stats => {
        expect(stats).toBe(statisticsToReturn);
        done();
      });
    });

    it('should show an error message if failed to load statistics', (done) => {
      const getPlayerHittingStatisticsError = new Error('Some error');
      const statisticsToReturn = null;
      statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);

      statisticsShellComponent.ngOnInit();

      const defaultStats: StatisticsDatabaseTable = {
        'Fall 2019-2020': [],
        'Spring 2019': []
      };
      statisticsShellComponent.statistics$.pipe(take(1)).subscribe(stats => {
        expect(stats).toEqual(defaultStats);

        statisticsShellComponent.errorMessage$.pipe(take(1)).subscribe(errorMessage => {
          expect(errorMessage).toBe('Could not load statistics');
          done();
        });
      });
    });
  });

  describe('statistics-selector', () => {
    it('should have an empty dropdown when statistics have not been loaded', () => {
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      expect(nativeElement.querySelector('select')).toBeTruthy();
      const allOptionsInDropdown = nativeElement.querySelectorAll('option');
      expect(allOptionsInDropdown.length).toBe(1);
      const defaultOption = allOptionsInDropdown[0];
      expect(defaultOption.textContent).toBe('Season');
    });
  });

  describe('statistics-table', () => {
    it('should have a table for the statistics', () => {
      expect(nativeElement.querySelector('table#stats-table')).toBeTruthy();
      expect(nativeElement.querySelector('table#stats-table thead')).toBeTruthy();
      expect(nativeElement.querySelector('table#stats-table thead tr')).toBeTruthy();
      expect(nativeElement.querySelector('table#stats-table tbody')).toBeTruthy();
    });
  });
});
