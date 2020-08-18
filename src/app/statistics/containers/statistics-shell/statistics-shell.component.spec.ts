import { StoreModule, Store } from '@ngrx/store';
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
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromStatistics from '../../state';
import * as statisticActions from '../../state/statistic.actions';
import { StatisticsKeyTableComponent } from '../../components/statistics-key-table/statistics-key-table.component';

describe('StatisticsShellComponent', () => {
  let statisticsShellComponent: StatisticsShellComponent;
  let fixture: ComponentFixture<StatisticsShellComponent>;
  let nativeElement;
  let statisticsServiceMock: StatisticsServiceMock;
  let store: Store<fromStatistics.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatisticsShellComponent,
        StatisticsSelectorComponent,
        StatisticsTableComponent,
        StatisticsKeyTableComponent
      ],
      providers: [
        {
          provide: 'IStatisticsService',
          useClass: StatisticsServiceMock
        }
      ],
      imports: [
        SharedModule,
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
    store = TestBed.get(Store);
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

  it('should have the statistics key table', () => {
    expect(nativeElement.querySelector('statistics-key-table')).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load the player hitting statistics', () => {
      statisticsServiceMock.getPlayerHittingStatistics.resetHistory();

      statisticsShellComponent.ngOnInit();

      expect(statisticsServiceMock.getPlayerHittingStatistics.callCount).toBe(1);
    });

    it('should update the statistics on successful load', (done) => {
      const getPlayerHittingStatisticsError = null;
      const statisticsToReturn = new StatisticsDatabaseTable();
      statisticsToReturn["Fall 2019-2020"] = [
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
      statisticsToReturn["Spring 2019"] = [];

      statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);

      statisticsShellComponent.ngOnInit();

      statisticsShellComponent.statistics$.pipe(take(1)).subscribe(stats => {
        expect(stats).toBe(statisticsToReturn);
        done();
      });
    });

    it('should populate the error message if failed to load statistics', (done) => {
      const getPlayerHittingStatisticsError = new Error('Some error');
      const statisticsToReturn = null;
      statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);

      statisticsShellComponent.ngOnInit();

      const defaultStats = new StatisticsDatabaseTable();
      statisticsShellComponent.statistics$.pipe(take(1)).subscribe(stats => {
        expect(stats).toEqual(defaultStats);

        statisticsShellComponent.errorMessage$.pipe(take(1)).subscribe(errorMessage => {
          expect(errorMessage).toBe('Could not load statistics');
          done();
        });
      });
    });

    it('should get the current season', (done) => {
      statisticsShellComponent.ngOnInit();

      statisticsShellComponent.currentSeason$.pipe(take(1)).subscribe(currentSeason => {
        expect(currentSeason).toBe('Season');
        done();
      });
    });
  });

  describe('statistics-selector', () => {
    it('should have only default option in dropdown when no statistics have been loaded', () => {
      const getPlayerHittingStatisticsError = null;
      const statisticsToReturn = new StatisticsDatabaseTable();

      statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      expect(nativeElement.querySelector('select')).toBeTruthy();
      const allOptionsInDropdown = nativeElement.querySelectorAll('option');
      expect(allOptionsInDropdown.length).toBe(1);
      const defaultOption = allOptionsInDropdown[0];
      expect(defaultOption.textContent).toBe('Season');
    });

    it('should populate the dropdown with the list of seasons when statistics have been loaded', () => {
      const getPlayerHittingStatisticsError = null;
      const statisticsToReturn = new StatisticsDatabaseTable();
      statisticsToReturn["Fall 2019-2020"] = [];
      statisticsToReturn["Spring 2019"] = [];
      statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);

      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      expect(nativeElement.querySelector('select')).toBeTruthy();
      const allOptionsInDropdown = nativeElement.querySelectorAll('option');
      expect(allOptionsInDropdown.length).toBe(3);
      const expectedOptions = ['Season', 'Fall 2019-2020', 'Spring 2019'];
      allOptionsInDropdown.forEach((dropdownOption, index) => {
        const expectedText = expectedOptions[index];
        expect(dropdownOption.textContent).toBe(expectedText);
      });
    });

    it('should not populate the dropdown when statistics failed to load', () => {
      const getPlayerHittingStatisticsError = new Error("some error loading statistics");
      const statisticsToReturn = null
      statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);

      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      expect(nativeElement.querySelector('select')).toBeTruthy();
      const allOptionsInDropdown = nativeElement.querySelectorAll('option');
      expect(allOptionsInDropdown.length).toBe(1);
      expect(allOptionsInDropdown[0].textContent).toBe('Season');
    });

    it('should set the current season when the user changes the selected season', (done) => {
      const getPlayerHittingStatisticsError = null;
      const statisticsToReturn = new StatisticsDatabaseTable();
      statisticsToReturn["Fall 2019-2020"] = [];
      statisticsToReturn["Spring 2019"] = [];
      statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      const seasonToSelect = "Fall 2019-2020";
      const seasonDropdown = nativeElement.querySelector('select');
      seasonDropdown.value = seasonToSelect;
      seasonDropdown.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      statisticsShellComponent.currentSeason$.pipe(take(1)).subscribe(currentSeason => {
        expect(currentSeason).toBe(seasonToSelect);
        done();
      });
    });

    it('should set the dropdown selection to the current season', () => {
      const getPlayerHittingStatisticsError = null;
      const statisticsToReturn = new StatisticsDatabaseTable();
      statisticsToReturn["Fall 2019-2020"] = [];
      statisticsToReturn["Spring 2019"] = [];
      statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      const currentSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(currentSeason));
      fixture.detectChanges();

      const allOptionsInDropdown = nativeElement.querySelectorAll('option');
      allOptionsInDropdown.forEach(dropdownOption => {
        if (dropdownOption.textContent === currentSeason) {
          expect(dropdownOption.selected).toBeTrue();
        } else {
          expect(dropdownOption.selected).toBeFalse();
        }
      });
    });
  });

  describe('statistics-table', () => {
    let statisticsToReturn: StatisticsDatabaseTable;

    beforeEach(() => {
      const getPlayerHittingStatisticsError = null;
      statisticsToReturn = new StatisticsDatabaseTable();
      statisticsToReturn["Fall 2019-2020"] = [
        {
          "#": 6, "Player": "me", "G": 14, "AB": 54, "R": 11, "H": 21, "2B": 1, "3B": 0, "HR": 0, "RBI": 9, "BB": 10, "SO": 6, "SB": 3, "CS": 1, "AVG": "0.389", "OBP": "0.500", "SLG": "0.407", "OPS": "0.907", "IBB": 0, "HBP": 2, "SAC": 2, "SF": 0, "TB": 22, "XBH": 1, "GDP": 0, "GO": 17, "AO": 4, "GO_AO": "4.25", "PA": 68
        },
        {
          "#": 8, "Player": "helmet slammer", "G": 11, "AB": 36, "R": 7, "H": 6, "2B": 1, "3B": 0, "HR": 0, "RBI": 4, "BB": 9, "SO": 4, "SB": 5, "CS": 0, "AVG": "0.167", "OBP": "0.347", "SLG": "0.194", "OPS": "0.541", "IBB": 0, "HBP": 2, "SAC": 1, "SF": 2, "TB": 7, "XBH": 1, "GDP": 0, "GO": 8, "AO": 20, "GO_AO": "0.40", "PA": 50
        }
      ];
      statisticsToReturn["Spring 2019"] = [
        {
          "#": 3, "Player": "this is my bro", "G": 17, "AB": 63, "R": 9, "H": 19, "2B": 1, "3B": 0, "HR": 0, "RBI": 11, "BB": 7, "SO": 19, "SB": 3, "CS": 1, "AVG": "0.302", "OBP": "0.380", "SLG": "0.317", "OPS": "0.697", "IBB": 0, "HBP": 1, "SAC": 0, "SF": 0, "TB": 20, "XBH": 1, "GDP": 1, "GO": 6, "AO": 12, "GO_AO": "0.50", "PA": 71
        },
        {
          "#": 4, "Player": "real estate", "G": 12, "AB": 44, "R": 13, "H": 15, "2B": 1, "3B": 1, "HR": 1, "RBI": 12, "BB": 6, "SO": 15, "SB": 1, "CS": 0, "AVG": "0.341", "OBP": "0.431", "SLG": "0.477", "OPS": "0.908", "IBB": 0, "HBP": 1, "SAC": 1, "SF": 0, "TB": 21, "XBH": 3, "GDP": 0, "GO": 7, "AO": 7, "GO_AO": "1.00", "PA": 52
        }
      ];
      statisticsServiceMock.getPlayerHittingStatisticsReturnValues.push([getPlayerHittingStatisticsError, statisticsToReturn]);
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();
    });

    it('should have a table for the statistics', () => {
      expect(nativeElement.querySelector('table#stats-table')).toBeTruthy();
      expect(nativeElement.querySelector('table#stats-table thead')).toBeTruthy();
      expect(nativeElement.querySelector('table#stats-table thead tr')).toBeTruthy();
      expect(nativeElement.querySelector('table#stats-table tbody')).toBeTruthy();
    });

    it('should have an empty table when dropdown is set to default option', () => {
      const defaultOption = 'Season';

      store.dispatch(new statisticActions.ChangeSeason(defaultOption));
      fixture.detectChanges();

      const allColumnsInHeadRow = nativeElement.querySelectorAll('table#stats-table thead tr th');
      const allRowsInBody = nativeElement.querySelectorAll('table#stats-table tbody tr');
      expect(allColumnsInHeadRow.length).toBe(0);
      expect(allRowsInBody.length).toBe(0);
    });

    it('should have an empty table when an invalid option is selected', () => {
      const invalidSeason = 'sadfbasjhdbfasjhd';

      store.dispatch(new statisticActions.ChangeSeason(invalidSeason));
      fixture.detectChanges();

      const allColumnsInHeadRow = nativeElement.querySelectorAll('table#stats-table thead tr th');
      const allRowsInBody = nativeElement.querySelectorAll('table#stats-table tbody tr');
      expect(allColumnsInHeadRow.length).toBe(0);
      expect(allRowsInBody.length).toBe(0);
    });

    it('should populate the table with stats from season when a valid option is selected', () => {
      const validSeason = 'Spring 2019';

      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const expectedPlayerSeasonStats = statisticsToReturn[validSeason];
      const expectedHeaderColumns = Object.keys(expectedPlayerSeasonStats[0]);
      const allColumnsInHeadRow = nativeElement.querySelectorAll('table#stats-table thead tr th');
      const allRowsInBody = nativeElement.querySelectorAll('table#stats-table tbody tr');
      const allColumnsInBodyRows = nativeElement.querySelectorAll('table#stats-table tbody tr td');
      expect(allColumnsInHeadRow.length).toBe(expectedHeaderColumns.length);
      allColumnsInHeadRow.forEach((column, index) => {
        expect(column.textContent).toBe(expectedHeaderColumns[index]);
      });
      expect(allRowsInBody.length).toBe(expectedPlayerSeasonStats.length);
      expect(allColumnsInBodyRows.length).toBe(expectedPlayerSeasonStats.length * expectedHeaderColumns.length);
      let columnInBodyRowIndex = 0;
      expectedPlayerSeasonStats.forEach(playerStats => {
        Object.values(playerStats).forEach(statistic => {
          expect(allColumnsInBodyRows[columnInBodyRowIndex].textContent).toBe(statistic.toString());
          columnInBodyRowIndex++;
        });
      });
    });

    it('should be ordered by jersey number', (done) => {
      const validSeason = 'Spring 2019';

      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const expectedPlayerSeasonStats = statisticsToReturn[validSeason];
      const selectedHeaderColumn = nativeElement.querySelectorAll('table#stats-table thead tr th.selected');
      const selectedColumnElementsInBodyRows = nativeElement.querySelectorAll('table#stats-table tbody tr td.selected');
      expect(selectedHeaderColumn.length).toBe(1);
      const expectedSelectedStat = '#';
      expect(selectedHeaderColumn[0].textContent).toBe(expectedSelectedStat);
      expect(selectedColumnElementsInBodyRows.length).toBe(expectedPlayerSeasonStats.length);
      selectedColumnElementsInBodyRows.forEach((columnElements, index) => {
        const statsForPlayer = expectedPlayerSeasonStats[index];
        expect(columnElements.textContent).toBe(statsForPlayer[expectedSelectedStat].toString());
      });
      statisticsShellComponent.selectedStatistic$.pipe(take(1)).subscribe(selectedStatistic => {
        expect(selectedStatistic).toBe(expectedSelectedStat);
        done()
      });
    });

    it('should change the selected statistic if a new statistic is selected', () => {
      const validSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const unselectedTableHeaderColumns = nativeElement.querySelectorAll('table#stats-table thead tr th:not(.selected)');
      unselectedTableHeaderColumns.forEach(tableHeaderColumn => {
        tableHeaderColumn.click();
        fixture.detectChanges();

        const expectedPlayerSeasonStats = statisticsToReturn[validSeason];
        const selectedHeaderColumn = nativeElement.querySelectorAll('table#stats-table thead tr th.selected');
        const selectedColumnElementsInBodyRows = nativeElement.querySelectorAll('table#stats-table tbody tr td.selected');
        expect(selectedHeaderColumn.length).toBe(1);
        const expectedSelectedStat = tableHeaderColumn.textContent;
        expect(selectedHeaderColumn[0].textContent).toBe(expectedSelectedStat);
        expect(selectedColumnElementsInBodyRows.length).toBe(expectedPlayerSeasonStats.length);
        statisticsShellComponent.selectedStatistic$.pipe(take(1)).subscribe(selectedStatistic => {
          expect(selectedStatistic).toBe(expectedSelectedStat);
        });
      });
    });
      });
    });
  });

  describe('statistics-key-table', () => {
    it('should have a key table for the statistics', () => {
      expect(nativeElement.querySelector('table#key-table')).toBeTruthy();
      expect(nativeElement.querySelector('table#key-table thead')).toBeTruthy();
      expect(nativeElement.querySelector('table#key-table tbody')).toBeTruthy();

      const tableHeaderRow = nativeElement.querySelectorAll('table#key-table thead tr');
      expect(tableHeaderRow).toBeTruthy();
      expect(tableHeaderRow.length).toBe(1);

      const tableHeaderElements = nativeElement.querySelectorAll('table#key-table thead tr th');
      expect(tableHeaderElements).toBeTruthy();
      expect(tableHeaderElements.length).toBe(3);
      const expectedHeaderColumns = ['Key', '', ''];
      tableHeaderElements.forEach((element, index) => {
        expect(element.textContent).toBe(expectedHeaderColumns[index]);
      });

      const tableBodyRows = nativeElement.querySelectorAll('table#key-table tbody tr');
      expect(tableBodyRows).toBeTruthy();
      expect(tableBodyRows.length).toBe(9);

      const tableBodyElements = nativeElement.querySelectorAll('table#key-table tbody tr td');
      expect(tableBodyElements).toBeTruthy();
      expect(tableBodyElements.length).toBe(27);
      const expectedBodyColumns = ['G - Games', 'AB - At Bats', 'R - Runs', 'H - Hits', '2B - Doubles', '3B - Triples', 'HR - Homeruns', 'RBI - Runs Batted In', 'BB - Base on Balls', 'SO - Strikeouts', 'SB - Stolen Bases', 'CS - Caught Stealing', 'AVG - Average', 'OBP - On-Base Percentage', 'SLG - Slugging Percentage', 'OPS - On-Base Plus Slugging', 'IBB - Intentional Walks', 'HBP - Hit By Pitch', 'SAC - Sacrifice Bunts', 'SF - Sacrifice Flys', 'TB - Total Bases', 'XBH - Extra Base Hits', 'GDP - Grounded Into Double Play', 'GO - Ground Outs', 'AO - Fly Outs', 'GO_AO - Ground Outs Per Fly Out', 'PA - Plate Appearances'];
      tableBodyElements.forEach((element, index) => {
        expect(element.textContent).toBe(expectedBodyColumns[index]);
      });
    });
  });
});
