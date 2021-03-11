import { StoreModule, Store } from '@ngrx/store';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StatisticsShellComponent } from './statistics-shell.component';
import { StatisticsSelectorComponent } from '../../components/statistics-selector/statistics-selector.component';
import { StatisticsTableComponent } from '../../components/statistics-table/statistics-table.component';
import { EffectsModule } from '@ngrx/effects';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import { take } from 'rxjs/operators';
import { reducer as appReducer } from 'src/app/state/app.reducer';
import { reducer as statisticsReducer } from '../../state/statistic.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromStatistics from '../../state';
import * as appActions from 'src/app/state/app.actions';
import * as statisticActions from '../../state/statistic.actions';
import { StatisticsKeyTableComponent } from '../../components/statistics-key-table/statistics-key-table.component';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StatisticsShellComponent', () => {
  let statisticsShellComponent: StatisticsShellComponent;
  let fixture: ComponentFixture<StatisticsShellComponent>;
  let nativeElement: HTMLElement;
  let store: Store<fromStatistics.State>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatisticsShellComponent,
        StatisticsSelectorComponent,
        StatisticsTableComponent,
        StatisticsKeyTableComponent
      ],
      providers: [],
      imports: [
        SharedModule,
        MaterialModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          appState: appReducer
        }),
        StoreModule.forFeature('statistics', statisticsReducer),
        EffectsModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsShellComponent);
    statisticsShellComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    store = TestBed.inject(Store);
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
    it('should update the statistics on successful load', (done) => {
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
      store.dispatch(new appActions.LoadSuccess(statisticsToReturn));

      statisticsShellComponent.ngOnInit();

      statisticsShellComponent.playerHittingStatistics$.pipe(take(1)).subscribe(stats => {
        expect(stats).toBe(statisticsToReturn);
        done();
      });
    });

    it('should populate the error message if failed to load statistics', (done) => {
      statisticsShellComponent.ngOnInit();
      store.dispatch(new appActions.LoadFail());

      const defaultStats = new PlayerHittingStatisticsDatabaseTable();
      statisticsShellComponent.playerHittingStatistics$.pipe(take(1)).subscribe(stats => {
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
        expect(currentSeason).toBe('');
        done();
      });
    });
  });

  describe('statistics-selector', () => {
    it('should have only the label no statistics have been loaded', () => {
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      const labelElement = nativeElement.querySelector('mat-label');
      expect(labelElement.textContent).toBe('Season');
      const selectElement: HTMLSelectElement = nativeElement.querySelector('mat-select');
      expect(selectElement).not.toBeNull();
      selectElement.click()
      fixture.detectChanges();
      const allOptionsInDropdown = document.querySelectorAll('mat-option');
      expect(allOptionsInDropdown.length).toBe(0);
    });

    it('should populate the dropdown with the list of seasons when statistics have been loaded', () => {
      const statisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
      statisticsToReturn['Fall 2019-2020'] = [];
      statisticsToReturn['Spring 2019'] = [];
      store.dispatch(new appActions.LoadSuccess(statisticsToReturn));

      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      const selectElement: HTMLSelectElement = nativeElement.querySelector('mat-select');
      expect(selectElement).not.toBeNull();
      selectElement.click()
      fixture.detectChanges();
      const allOptionsInDropdown = document.querySelectorAll('mat-option');
      expect(allOptionsInDropdown.length).toBe(2);
      const expectedOptions = ['Fall 2019-2020', 'Spring 2019'];
      allOptionsInDropdown.forEach((dropdownOption, index) => {
        const expectedText = expectedOptions[index];
        expect(dropdownOption.textContent).toBe(expectedText);
      });
    });

    it('should not populate the dropdown when statistics failed to load', () => {
      store.dispatch(new appActions.LoadFail());

      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      const selectElement: HTMLSelectElement = nativeElement.querySelector('mat-select');
      expect(selectElement).not.toBeNull();
      selectElement.click()
      fixture.detectChanges();
      const allOptionsInDropdown = document.querySelectorAll('mat-option');
      expect(allOptionsInDropdown.length).toBe(0);
    });

    it('should set the current season when the user changes the selected season', (done) => {
      const statisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
      statisticsToReturn['Fall 2019-2020'] = [];
      statisticsToReturn['Spring 2019'] = [];
      store.dispatch(new appActions.LoadSuccess(statisticsToReturn));
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      const seasonToSelect = 'Fall 2019-2020';
      const selectElement: HTMLSelectElement = nativeElement.querySelector('mat-select');
      expect(selectElement).not.toBeNull();
      selectElement.click()
      fixture.detectChanges();
      const allOptionsInDropdown: NodeListOf<HTMLOptionElement> = document.querySelectorAll('mat-option');
      allOptionsInDropdown.forEach(dropdownOption => {
        if (dropdownOption.textContent === seasonToSelect) {
          dropdownOption.click();
        }
      });
      fixture.detectChanges();

      statisticsShellComponent.currentSeason$.pipe(take(1)).subscribe(currentSeason => {
        expect(currentSeason).toBe(seasonToSelect);
        done();
      });
    });

    it('should set the dropdown selection to the current season', () => {
      const statisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
      statisticsToReturn['Fall 2019-2020'] = [];
      statisticsToReturn['Spring 2019'] = [];
      store.dispatch(new appActions.LoadSuccess(statisticsToReturn));
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      const currentSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(currentSeason));
      fixture.detectChanges();
      
      const selectElement: HTMLSelectElement = nativeElement.querySelector('mat-select');
      expect(selectElement.textContent).toBe(currentSeason);
    });
  });

  describe('statistics-table', () => {
    const playerNumber3 = {
      '#': 3, Player: 'this is my bro', G: 17, AB: 63, R: 9, H: 19, '2B': 1, '3B': 0, HR: 0, RBI: 11, BB: 7, SO: 19, SB: 3, CS: 1, AVG: '0.302', OBP: '0.380', SLG: '0.317', OPS: '0.697', IBB: 0, HBP: 1, SAC: 0, SF: 0, TB: 20, XBH: 1, GDP: 1, GO: 6, AO: 12, GO_AO: '0.50', PA: 71
    };
    const playerNumber4 = {
      '#': 4, Player: 'real estate', G: 12, AB: 44, R: 13, H: 15, '2B': 1, '3B': 1, HR: 1, RBI: 12, BB: 6, SO: 15, SB: 1, CS: 0, AVG: '0.341', OBP: '0.431', SLG: '0.477', OPS: '0.908', IBB: 0, HBP: 1, SAC: 1, SF: 0, TB: 21, XBH: 3, GDP: 0, GO: 7, AO: 7, GO_AO: '1.00', PA: 52
    };
    const playerNumber6 = {
      '#': 6, Player: 'me', G: 14, AB: 54, R: 11, H: 21, '2B': 1, '3B': 0, HR: 0, RBI: 9, BB: 10, SO: 6, SB: 3, CS: 1, AVG: '0.389', OBP: '0.500', SLG: '0.407', OPS: '0.907', IBB: 0, HBP: 2, SAC: 2, SF: 0, TB: 22, XBH: 1, GDP: 0, GO: 17, AO: 4, GO_AO: '4.25', PA: 68
    };
    const playerNumber8 = {
      '#': 8, Player: 'helmet slammer', G: 11, AB: 36, R: 7, H: 6, '2B': 1, '3B': 0, HR: 0, RBI: 4, BB: 9, SO: 4, SB: 5, CS: 0, AVG: '0.167', OBP: '0.347', SLG: '0.194', OPS: '0.541', IBB: 0, HBP: 2, SAC: 1, SF: 2, TB: 7, XBH: 1, GDP: 0, GO: 8, AO: 20, GO_AO: '0.40', PA: 50
    };
    const selectedColumnClass = '.selected';
    const statsTableSelector = 'table#stats-table';
    const statsTableHeaderSelector = statsTableSelector + ' thead tr';
    const statsTableHeaderCellSelector = statsTableHeaderSelector + ' th';
    const statsTableSelectedHeaderCellSelector = statsTableHeaderCellSelector + selectedColumnClass;
    const statsTableUnselectedHeaderCellSelector = statsTableHeaderCellSelector + ':not(.selected)';
    const statsTableBodyRowSelector = statsTableSelector + ' tbody tr';
    const statsTableBodyCellSelector = statsTableBodyRowSelector + ' td';
    const statsTableSelectedBodyCellSelector = statsTableBodyCellSelector + selectedColumnClass;
    
    let statisticsToReturn: PlayerHittingStatisticsDatabaseTable;

    beforeEach(() => {
      statisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
      statisticsToReturn['Fall 2019-2020'] = [playerNumber6, playerNumber8];
      statisticsToReturn['Spring 2019'] = [playerNumber3, playerNumber4];
      statisticsShellComponent.ngOnInit();
      store.dispatch(new appActions.LoadSuccess(statisticsToReturn));
      fixture.detectChanges();
    });

    it('should have a table for the statistics', () => {
      expect(nativeElement.querySelector(statsTableSelector)).toBeTruthy();
      expect(nativeElement.querySelector(statsTableHeaderSelector)).toBeTruthy();
    });

    it('should have an empty table when dropdown is set to default option', () => {
      const defaultOption = 'Season';

      store.dispatch(new statisticActions.ChangeSeason(defaultOption));
      fixture.detectChanges();

      const allColumnsInHeadRow = nativeElement.querySelectorAll(statsTableHeaderCellSelector);
      const allRowsInBody = nativeElement.querySelectorAll(statsTableBodyRowSelector);
      expect(allColumnsInHeadRow.length).toBe(0);
      expect(allRowsInBody.length).toBe(0);
    });

    it('should have an empty table when an invalid option is selected', () => {
      const invalidSeason = 'this is an invalid season';

      store.dispatch(new statisticActions.ChangeSeason(invalidSeason));
      fixture.detectChanges();

      const allColumnsInHeadRow = nativeElement.querySelectorAll(statsTableHeaderCellSelector);
      const allRowsInBody = nativeElement.querySelectorAll(statsTableBodyRowSelector);
      expect(allColumnsInHeadRow.length).toBe(0);
      expect(allRowsInBody.length).toBe(0);
    });

    it('should populate the table with stats from season when a valid option is selected', () => {
      const validSeason = 'Spring 2019';

      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const expectedPlayerSeasonStats = statisticsToReturn[validSeason];
      const expectedHeaderColumns = Object.keys(expectedPlayerSeasonStats[0]);
      const allColumnsInHeadRow = nativeElement.querySelectorAll(statsTableHeaderCellSelector);
      const allRowsInBody = nativeElement.querySelectorAll(statsTableBodyRowSelector);
      const allColumnsInBodyRows = nativeElement.querySelectorAll(statsTableBodyCellSelector);
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
      const selectedHeaderColumn = nativeElement.querySelectorAll(statsTableSelectedHeaderCellSelector);
      const selectedColumnElementsInBodyRows = nativeElement.querySelectorAll(statsTableSelectedBodyCellSelector);
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
        done();
      });
    });

    it('should change the selected statistic if a new statistic is selected', () => {
      const validSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const unselectedTableHeaderColumns: NodeListOf<HTMLTableHeaderCellElement> = nativeElement.querySelectorAll(statsTableUnselectedHeaderCellSelector);
      unselectedTableHeaderColumns.forEach(tableHeaderColumn => {
        tableHeaderColumn.click();
        fixture.detectChanges();

        const expectedPlayerSeasonStats = statisticsToReturn[validSeason];
        const selectedHeaderColumn = nativeElement.querySelectorAll(statsTableSelectedHeaderCellSelector);
        const selectedColumnElementsInBodyRows = nativeElement.querySelectorAll(statsTableSelectedBodyCellSelector);
        expect(selectedHeaderColumn.length).toBe(1);
        const expectedSelectedStat = tableHeaderColumn.textContent;
        expect(selectedHeaderColumn[0].textContent).toBe(expectedSelectedStat);
        expect(selectedColumnElementsInBodyRows.length).toBe(expectedPlayerSeasonStats.length);
        statisticsShellComponent.selectedStatistic$.pipe(take(1)).subscribe(selectedStatistic => {
          expect(selectedStatistic).toBe(expectedSelectedStat);
        });
      });
    });

    it('should sort the statistics in order of selected stat when a new stat is selected', () => {
      const validSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const unselectedTableHeaderColumns = nativeElement.querySelectorAll(statsTableUnselectedHeaderCellSelector);
      const columnToSelect = 'Player';
      let playerNameColumn;
      unselectedTableHeaderColumns.forEach(tableHeaderColumn => {
        if (tableHeaderColumn.textContent === columnToSelect) {
          playerNameColumn = tableHeaderColumn;
        }
      });
      playerNameColumn.click();
      fixture.detectChanges();

      const expectedPlayerSeasonStats = [playerNumber4, playerNumber3];
      const selectedColumnElementsInBodyRows = nativeElement.querySelectorAll(statsTableSelectedBodyCellSelector);
      expect(selectedColumnElementsInBodyRows.length).toBe(expectedPlayerSeasonStats.length);
      selectedColumnElementsInBodyRows.forEach((columnElements, index) => {
        const statsForPlayer = expectedPlayerSeasonStats[index];
        expect(columnElements.textContent).toBe(statsForPlayer[columnToSelect].toString());
      });
      const allColumnsInBodyRows = nativeElement.querySelectorAll(statsTableBodyCellSelector);
      let columnInBodyRowIndex = 0;
      expectedPlayerSeasonStats.forEach(playerStats => {
        Object.values(playerStats).forEach(statistic => {
          expect(allColumnsInBodyRows[columnInBodyRowIndex].textContent).toBe(statistic.toString());
          columnInBodyRowIndex++;
        });
      });
    });

    it('should sort the statistics in reverse order of selected stat when the same stat is selected', () => {
      const validSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      let selectedHeaderColumn: HTMLTableHeaderCellElement = nativeElement.querySelector(statsTableSelectedHeaderCellSelector);
      const selectedColumnStat = selectedHeaderColumn.textContent;
      selectedHeaderColumn.click();
      fixture.detectChanges();

      statisticsShellComponent.selectedStatistic$.pipe(take(1)).subscribe(selectedStatistic => {
        expect(selectedStatistic).toBe(selectedColumnStat + 'Reverse');
      });
      const expectedPlayerSeasonStats = [playerNumber4, playerNumber3];
      const selectedHeaderColumns = nativeElement.querySelectorAll(statsTableSelectedHeaderCellSelector);
      expect(selectedHeaderColumns.length).toBe(1);

      const selectedColumnElementsInBodyRows = nativeElement.querySelectorAll(statsTableSelectedBodyCellSelector);
      expect(selectedColumnElementsInBodyRows.length).toBe(expectedPlayerSeasonStats.length);
      selectedColumnElementsInBodyRows.forEach((columnElements, index) => {
        const statsForPlayer = expectedPlayerSeasonStats[index];
        expect(columnElements.textContent).toBe(statsForPlayer[selectedColumnStat].toString());
      });
      const allColumnsInBodyRows = nativeElement.querySelectorAll(statsTableBodyCellSelector);
      let columnInBodyRowIndex = 0;
      expectedPlayerSeasonStats.forEach(playerStats => {
        Object.values(playerStats).forEach(statistic => {
          expect(allColumnsInBodyRows[columnInBodyRowIndex].textContent).toBe(statistic.toString());
          columnInBodyRowIndex++;
        });
      });
    });

    it('should sort the statistics in reverse order of selected stat when the same stat is selected', () => {
      const validSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      let selectedHeaderColumn: HTMLTableHeaderCellElement = nativeElement.querySelector(statsTableSelectedHeaderCellSelector);
      const selectedColumnStat = selectedHeaderColumn.textContent;
      selectedHeaderColumn.click();
      fixture.detectChanges();
      selectedHeaderColumn.click();
      fixture.detectChanges();

      statisticsShellComponent.selectedStatistic$.pipe(take(1)).subscribe(selectedStatistic => {
        expect(selectedStatistic).toBe(selectedColumnStat);
      });
      const expectedPlayerSeasonStats = [playerNumber3, playerNumber4];
      const selectedHeaderColumns = nativeElement.querySelectorAll(statsTableSelectedHeaderCellSelector);
      expect(selectedHeaderColumns.length).toBe(1);

      const selectedColumnElementsInBodyRows = nativeElement.querySelectorAll(statsTableSelectedBodyCellSelector);
      expect(selectedColumnElementsInBodyRows.length).toBe(expectedPlayerSeasonStats.length);
      selectedColumnElementsInBodyRows.forEach((columnElements, index) => {
        const statsForPlayer = expectedPlayerSeasonStats[index];
        expect(columnElements.textContent).toBe(statsForPlayer[selectedColumnStat].toString());
      });
      const allColumnsInBodyRows = nativeElement.querySelectorAll(statsTableBodyCellSelector);
      let columnInBodyRowIndex = 0;
      expectedPlayerSeasonStats.forEach(playerStats => {
        Object.values(playerStats).forEach(statistic => {
          expect(allColumnsInBodyRows[columnInBodyRowIndex].textContent).toBe(statistic.toString());
          columnInBodyRowIndex++;
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
