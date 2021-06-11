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
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerHittingStatistics } from 'src/app/classes/player-hitting-statistics';
import { PlayerPitchingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-pitching-statistics-database-table';

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
        StatisticsTableComponent
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

  describe('ngOnInit', () => {
    it('should update the hitting statistics on successful load', (done) => {
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
      ];
      statisticsToReturn['Spring 2019'] = [];
      store.dispatch(new appActions.LoadHittingStatisticsSuccess(statisticsToReturn));

      statisticsShellComponent.ngOnInit();

      statisticsShellComponent.playerHittingStatistics$.pipe(take(1)).subscribe(stats => {
        expect(stats).toBe(statisticsToReturn);
        done();
      });
    });

    it('should update the pitching statistics on successful load', (done) => {
      const statisticsToReturn = new PlayerPitchingStatisticsDatabaseTable();
      statisticsToReturn['Spring 2021'] = [
        { "#": 4, "Player": "real estate", "W": 0, "L": 0, "ERA": ".--", "G": 0, "GS": 0, "CG": 0, "SHO": 0, "SV": 0, "SVO": 0, "IP": 0, "H": 0, "R": 0, "ER": 0, "HR": 0, "HB": 0, "BB": 0, "SO": 0, "AB": 0, "WHIP": ".--", "AVG": ".---", "TBF": 0, "NP": 0, "P/IP": ".--", "QS": 0, "GF": 0, "HLD": 0, "IBB": 0, "WP": 0, "BK": 0, "SF": 0, "GDP": 0, "GO": 0, "AO": 0, "GO/AO": ".--", "SO/9": ".--", "BB/9": ".--", "K/BB": ".--", "BABIP": ".---", "SB": 0, "CS": 0, "PK": 0 },
        { "#": 6, "Player": "yours truly", "W": 0, "L": 0, "ERA": ".--", "G": 0, "GS": 0, "CG": 0, "SHO": 0, "SV": 0, "SVO": 0, "IP": 0, "H": 0, "R": 0, "ER": 0, "HR": 0, "HB": 0, "BB": 0, "SO": 0, "AB": 0, "WHIP": ".--", "AVG": ".---", "TBF": 0, "NP": 0, "P/IP": ".--", "QS": 0, "GF": 0, "HLD": 0, "IBB": 0, "WP": 0, "BK": 0, "SF": 0, "GDP": 0, "GO": 0, "AO": 0, "GO/AO": ".--", "SO/9": ".--", "BB/9": ".--", "K/BB": ".--", "BABIP": ".---", "SB": 0, "CS": 0, "PK": 0 }
      ];
      store.dispatch(new appActions.LoadPitchingStatisticsSuccess(statisticsToReturn));

      statisticsShellComponent.ngOnInit();

      statisticsShellComponent.playerPitchingStatistics$.pipe(take(1)).subscribe(stats => {
        expect(stats).toBe(statisticsToReturn);
        done();
      });
    });

    it('should populate the error message if failed to load', (done) => {
      statisticsShellComponent.ngOnInit();
      store.dispatch(new appActions.LoadHittingStatisticsFail());

      const defaultStats = new PlayerHittingStatisticsDatabaseTable();
      statisticsShellComponent.playerHittingStatistics$.pipe(take(1)).subscribe(stats => {
        expect(stats).toEqual(defaultStats);

        statisticsShellComponent.errorMessage$.pipe(take(1)).subscribe(errorMessage => {
          expect(errorMessage).toBe('Could not load hitting statistics');
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
    it('should allow the user to select hitting or pitching statistics', () => {
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      const statisticTypesButtonToggleGroup = nativeElement.querySelector('mat-button-toggle-group#statistic-types');
      expect(statisticTypesButtonToggleGroup).not.toBeNull();
      const statisticTypeButtonToggles = statisticTypesButtonToggleGroup.querySelectorAll('mat-button-toggle');
      expect(statisticTypeButtonToggles.length).toBe(2);
      expect(statisticTypeButtonToggles[0].textContent).toBe('Hitting');
      expect(statisticTypeButtonToggles[1].textContent).toBe('Pitching');
    });

    it('should have hitting statistics selected by default', () => {
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      const buttonToggleGroup = nativeElement.querySelector('mat-button-toggle-group#statistic-types');
      const selectedButtonToggle = buttonToggleGroup.querySelector('mat-button-toggle.mat-button-toggle-checked');
      expect(selectedButtonToggle.textContent).toBe('Hitting');
    });

    it('should set the statistics type when the user changes the selected statistics type', (done) => {
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      const buttonToggleGroup = nativeElement.querySelector('mat-button-toggle-group#statistic-types');
      const advancedStatsGroupButton: HTMLButtonElement = buttonToggleGroup.querySelector('mat-button-toggle:not(.mat-button-toggle-checked) > button');
      advancedStatsGroupButton.click();
      fixture.detectChanges();

      const selectedButtonToggle = buttonToggleGroup.querySelector('mat-button-toggle.mat-button-toggle-checked');
      expect(selectedButtonToggle.textContent).toBe('Pitching');
      statisticsShellComponent.selectedStatisticsType$.pipe(take(1)).subscribe(selectedStatisticsGroup => {
        expect(selectedStatisticsGroup).toBe('pitching');
        done();
      });
    });

    it('should reset the current season when switching statistic types', (done) => {
      const hittingStatisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
      hittingStatisticsToReturn['Fall 2019-2020'] = [];
      hittingStatisticsToReturn['Spring 2019'] = [];
      store.dispatch(new appActions.LoadHittingStatisticsSuccess(hittingStatisticsToReturn));
      const pitchingStatisticsToReturn = new PlayerPitchingStatisticsDatabaseTable();
      pitchingStatisticsToReturn['Spring 2021'] = [];
      store.dispatch(new appActions.LoadPitchingStatisticsSuccess(pitchingStatisticsToReturn));
      statisticsShellComponent.ngOnInit();
      const currentSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(currentSeason));
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      const buttonToggleGroup = nativeElement.querySelector('mat-button-toggle-group#statistic-types');
      const advancedStatsGroupButton: HTMLButtonElement = buttonToggleGroup.querySelector('mat-button-toggle:not(.mat-button-toggle-checked) > button');
      advancedStatsGroupButton.click();
      fixture.detectChanges();

      statisticsShellComponent.currentSeason$.pipe(take(1)).subscribe(currentSeason => {
        expect(currentSeason).toBe('');
        done();
      });
    });

    it('should have only the label when no statistics have been loaded', () => {
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

    it('should populate the dropdown with the list of seasons when hitting statistics have been loaded', () => {
      const statisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
      statisticsToReturn['Fall 2019-2020'] = [];
      statisticsToReturn['Spring 2019'] = [];
      store.dispatch(new appActions.LoadHittingStatisticsSuccess(statisticsToReturn));

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
      store.dispatch(new appActions.LoadHittingStatisticsFail());

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
      store.dispatch(new appActions.LoadHittingStatisticsSuccess(statisticsToReturn));
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
      store.dispatch(new appActions.LoadHittingStatisticsSuccess(statisticsToReturn));
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      const currentSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(currentSeason));
      fixture.detectChanges();

      const selectElement: HTMLSelectElement = nativeElement.querySelector('mat-select');
      expect(selectElement.textContent).toBe(currentSeason);
    });

    it('should allow the user to select whether they want to select standard or advanced statistics', () => {
      const statisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
      statisticsToReturn['Fall 2019-2020'] = [];
      statisticsToReturn['Spring 2019'] = [];
      store.dispatch(new appActions.LoadHittingStatisticsSuccess(statisticsToReturn));
      statisticsShellComponent.ngOnInit();
      const currentSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(currentSeason));
      fixture.detectChanges();

      const buttonToggleGroup = nativeElement.querySelector('mat-button-toggle-group#statistic-groups');
      expect(buttonToggleGroup).not.toBeNull();
      const buttonToggles = buttonToggleGroup.querySelectorAll('mat-button-toggle');
      expect(buttonToggles.length).toBe(2);
      expect(buttonToggles[0].textContent).toBe('Standard');
      expect(buttonToggles[1].textContent).toBe('Advanced');
    });

    it('should not give the user the option to select the group of statistics when no season is selected', () => {
      const statisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
      statisticsToReturn['Fall 2019-2020'] = [];
      statisticsToReturn['Spring 2019'] = [];
      store.dispatch(new appActions.LoadHittingStatisticsSuccess(statisticsToReturn));
      statisticsShellComponent.ngOnInit();
      fixture.detectChanges();

      const buttonToggleGroup = nativeElement.querySelector('mat-button-toggle-group#statistic-groups');
      expect(buttonToggleGroup).toBeNull();
    });

    it('should have standard statistics group selected by default', () => {
      const statisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
      statisticsToReturn['Fall 2019-2020'] = [];
      statisticsToReturn['Spring 2019'] = [];
      store.dispatch(new appActions.LoadHittingStatisticsSuccess(statisticsToReturn));
      statisticsShellComponent.ngOnInit();
      const currentSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(currentSeason));
      fixture.detectChanges();

      const buttonToggleGroup = nativeElement.querySelector('mat-button-toggle-group#statistic-groups');
      const selectedButtonToggle = buttonToggleGroup.querySelector('mat-button-toggle.mat-button-toggle-checked');
      expect(selectedButtonToggle.textContent).toBe('Standard');
    });

    it('should set the statistics group when the user changes the selected statistics group', (done) => {
      const statisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
      statisticsToReturn['Fall 2019-2020'] = [];
      statisticsToReturn['Spring 2019'] = [];
      store.dispatch(new appActions.LoadHittingStatisticsSuccess(statisticsToReturn));
      statisticsShellComponent.ngOnInit();
      const currentSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(currentSeason));
      fixture.detectChanges();

      const buttonToggleGroup = nativeElement.querySelector('mat-button-toggle-group#statistic-groups');
      const advancedStatsGroupButton: HTMLButtonElement = buttonToggleGroup.querySelector('mat-button-toggle:not(.mat-button-toggle-checked) > button');
      advancedStatsGroupButton.click();
      fixture.detectChanges();

      const selectedButtonToggle = buttonToggleGroup.querySelector('mat-button-toggle.mat-button-toggle-checked');
      expect(selectedButtonToggle.textContent).toBe('Advanced');
      statisticsShellComponent.selectedStatisticsGroup$.pipe(take(1)).subscribe(selectedStatisticsGroup => {
        expect(selectedStatisticsGroup).toBe('advanced');
        done();
      });
    });
  });

  describe('statistics-table', () => {
    const playerNumber3 = {
      '#': 3, Player: 'this is my bro', G: 17, AB: 63, R: 9, H: 19, '2B': 1, '3B': 0, HR: 0, RBI: 11, BB: 7, SO: 19, SB: 3, CS: 1, AVG: '0.302', OBP: '0.380', SLG: '0.317', OPS: '0.697', IBB: 0, HBP: 1, SAC: 0, SF: 0, TB: 20, XBH: 1, GIDP: 1, GO: 6, AO: 12, 'GO/AO': '0.50', PA: 71, BABIP: '0.00', ISO: '0.10', 'AB/HR': '0.20', 'BB/K': '0.30', 'BB%': '0.40', 'SO%': '0.50'
    };
    const playerNumber4 = {
      '#': 4, Player: 'real estate', G: 12, AB: 44, R: 13, H: 15, '2B': 1, '3B': 1, HR: 1, RBI: 12, BB: 6, SO: 15, SB: 1, CS: 0, AVG: '0.341', OBP: '0.431', SLG: '0.477', OPS: '0.908', IBB: 0, HBP: 1, SAC: 1, SF: 0, TB: 21, XBH: 3, GIDP: 0, GO: 7, AO: 7, 'GO/AO': '1.00', PA: 52, BABIP: '0.00', ISO: '0.10', 'AB/HR': '0.20', 'BB/K': '0.30', 'BB%': '0.40', 'SO%': '0.50'
    };
    const playerNumber6 = {
      '#': 6, Player: 'me', G: 14, AB: 54, R: 11, H: 21, '2B': 1, '3B': 0, HR: 0, RBI: 9, BB: 10, SO: 6, SB: 3, CS: 1, AVG: '0.389', OBP: '0.500', SLG: '0.407', OPS: '0.907', IBB: 0, HBP: 2, SAC: 2, SF: 0, TB: 22, XBH: 1, GIDP: 0, GO: 17, AO: 4, 'GO/AO': '4.25', PA: 68, BABIP: '0.00', ISO: '0.10', 'AB/HR': '0.20', 'BB/K': '0.30', 'BB%': '0.40', 'SO%': '0.50'
    };
    const playerNumber8 = {
      '#': 8, Player: 'helmet slammer', G: 11, AB: 36, R: 7, H: 6, '2B': 1, '3B': 0, HR: 0, RBI: 4, BB: 9, SO: 4, SB: 5, CS: 0, AVG: '0.167', OBP: '0.347', SLG: '0.194', OPS: '0.541', IBB: 0, HBP: 2, SAC: 1, SF: 2, TB: 7, XBH: 1, GIDP: 0, GO: 8, AO: 20, 'GO/AO': '0.40', PA: 50, BABIP: '0.00', ISO: '0.10', 'AB/HR': '0.20', 'BB/K': '0.30', 'BB%': '0.40', 'SO%': '0.50'
    };
    const materialSortedHeaderColumnClass = '.mat-sort-header-sorted';
    const statsTableSelector = 'table.mat-table';
    const statsTableHeaderSelector = statsTableSelector + ' thead tr';
    const statsTableHeaderCellSelector = statsTableHeaderSelector + ' th';
    const statsTableSelectedHeaderCellSelector = `${statsTableHeaderCellSelector} ${materialSortedHeaderColumnClass}`;
    const statsTableUnselectedHeaderCellSelector = `${statsTableHeaderCellSelector} div:not(${materialSortedHeaderColumnClass})`;
    const statsTableBodyRowSelector = statsTableSelector + ' tbody tr';
    const statsTableBodyCellSelector = statsTableBodyRowSelector + ' td';
    const expectedStandardStatisticsKeys = ['#', 'Player', 'G', 'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'BB', 'SO', 'SB', 'CS', 'AVG', 'OBP', 'SLG', 'OPS'];
    const expectedAdvancedStatisticsKeys = ['#', 'Player', 'PA', 'HBP', 'SAC', 'SF', 'GIDP', 'GO/AO', 'XBH', 'TB', 'IBB', 'BABIP', 'ISO', 'AB/HR', 'BB/K', 'BB%', 'SO%'];

    let statisticsToReturn: PlayerHittingStatisticsDatabaseTable;

    function getSelectedTableBodyCells(selectedColumn: string): NodeListOf<Element> {
      return nativeElement.querySelectorAll(`${statsTableBodyCellSelector}.mat-column-${selectedColumn}`);
    }
    
    function verifyStatsTableBodyContents(expectedPlayerSeasonStats: PlayerHittingStatistics[], expectedHeaderColumns: string[], actualCellsInTableBody: NodeListOf<Element>){
      let columnInBodyRowIndex = 0;
      expectedPlayerSeasonStats.forEach(playerStats => {
        expectedHeaderColumns.forEach(statisticKey => {
          expect(actualCellsInTableBody[columnInBodyRowIndex].textContent).toBe(playerStats[statisticKey].toString());
          columnInBodyRowIndex++;
        });
      });
    }

    beforeEach(() => {
      statisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
      statisticsToReturn['Fall 2019-2020'] = [playerNumber6, playerNumber8];
      statisticsToReturn['Spring 2019'] = [playerNumber3, playerNumber4];
      statisticsShellComponent.ngOnInit();
      store.dispatch(new appActions.LoadHittingStatisticsSuccess(statisticsToReturn));
      fixture.detectChanges();
    });

    it('should not have any rows or columns in table when dropdown is set to default option', () => {
      const defaultOption = '';

      store.dispatch(new statisticActions.ChangeSeason(defaultOption));
      fixture.detectChanges();

      expect(nativeElement.querySelector(statsTableSelector)).toBeTruthy();
      expect(nativeElement.querySelector(statsTableHeaderSelector)).toBeTruthy();
      const allColumnsInHeadRow = nativeElement.querySelectorAll(statsTableHeaderCellSelector);
      const allRowsInBody = nativeElement.querySelectorAll(statsTableBodyRowSelector);
      expect(allColumnsInHeadRow.length).toBe(0);
      expect(allRowsInBody.length).toBe(0);
    });

    it('should populate the table with standard group of stats from season when a valid option is selected', () => {
      const validSeason = 'Spring 2019';

      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      expect(nativeElement.querySelector(statsTableSelector)).toBeTruthy();
      expect(nativeElement.querySelector(statsTableHeaderSelector)).toBeTruthy();
      const expectedPlayerSeasonStats = statisticsToReturn[validSeason];
      const allColumnsInHeadRow = nativeElement.querySelectorAll(statsTableHeaderCellSelector);
      const allRowsInBody = nativeElement.querySelectorAll(statsTableBodyRowSelector);
      const allColumnsInBodyRows = nativeElement.querySelectorAll(statsTableBodyCellSelector);
      expect(allColumnsInHeadRow.length).toBe(expectedStandardStatisticsKeys.length);
      allColumnsInHeadRow.forEach((column, index) => {
        expect(column.textContent).toBe(expectedStandardStatisticsKeys[index]);
      });
      expect(allRowsInBody.length).toBe(expectedPlayerSeasonStats.length);
      expect(allColumnsInBodyRows.length).toBe(expectedPlayerSeasonStats.length * expectedStandardStatisticsKeys.length);
      verifyStatsTableBodyContents(expectedPlayerSeasonStats, expectedStandardStatisticsKeys, allColumnsInBodyRows);
    });
    
    it('should populate the table with advanced group of stats from season when a valid option is selected', () => {
      const validSeason = 'Spring 2019';

      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      store.dispatch(new statisticActions.ChangeStatisticsGroup('advanced'));
      fixture.detectChanges();

      expect(nativeElement.querySelector(statsTableSelector)).toBeTruthy();
      expect(nativeElement.querySelector(statsTableHeaderSelector)).toBeTruthy();
      const expectedPlayerSeasonStats = statisticsToReturn[validSeason];
      const allColumnsInHeadRow = nativeElement.querySelectorAll(statsTableHeaderCellSelector);
      const allRowsInBody = nativeElement.querySelectorAll(statsTableBodyRowSelector);
      const allColumnsInBodyRows = nativeElement.querySelectorAll(statsTableBodyCellSelector);
      expect(allColumnsInHeadRow.length).toBe(expectedAdvancedStatisticsKeys.length);
      allColumnsInHeadRow.forEach((column, index) => {
        expect(column.textContent).toBe(expectedAdvancedStatisticsKeys[index]);
      });
      expect(allRowsInBody.length).toBe(expectedPlayerSeasonStats.length);
      expect(allColumnsInBodyRows.length).toBe(expectedPlayerSeasonStats.length * expectedAdvancedStatisticsKeys.length);
      verifyStatsTableBodyContents(expectedPlayerSeasonStats, expectedAdvancedStatisticsKeys, allColumnsInBodyRows);
    });

    it('should not be sorted by default', () => {
      const validSeason = 'Spring 2019';

      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const selectedHeaderColumns = nativeElement.querySelectorAll(statsTableSelectedHeaderCellSelector);
      expect(selectedHeaderColumns.length).toBe(0);
    });

    it('should change the selected statistic if a statistic is selected', () => {
      const validSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const tableHeaderColumns: NodeListOf<HTMLTableHeaderCellElement> = nativeElement.querySelectorAll(statsTableHeaderCellSelector);
      tableHeaderColumns.forEach(tableHeaderColumn => {
        tableHeaderColumn.click();
        fixture.detectChanges();

        const selectedHeaderColumn = nativeElement.querySelectorAll(statsTableSelectedHeaderCellSelector);
        expect(selectedHeaderColumn.length).toBe(1);
        const expectedSelectedStat = tableHeaderColumn.textContent;
        expect(selectedHeaderColumn[0].textContent).toBe(expectedSelectedStat);
      });
    });

    it('should sort the statistics ascending when sorting by jersey number', () => {
      const validSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const unselectedTableHeaderColumns: NodeListOf<HTMLTableHeaderCellElement> = nativeElement.querySelectorAll(statsTableUnselectedHeaderCellSelector);
      const columnToSelect = '#';
      let jerseyNumberColumn: HTMLTableHeaderCellElement;
      unselectedTableHeaderColumns.forEach(tableHeaderColumn => {
        if (tableHeaderColumn.textContent === columnToSelect) {
          jerseyNumberColumn = tableHeaderColumn;
        }
      });
      jerseyNumberColumn.click();
      fixture.detectChanges();

      const expectedPlayerSeasonStats = [playerNumber3, playerNumber4];
      const selectedColumnElementsInBodyRows = getSelectedTableBodyCells('-');
      expect(selectedColumnElementsInBodyRows.length).toBe(expectedPlayerSeasonStats.length);
      selectedColumnElementsInBodyRows.forEach((columnElements, index) => {
        const statsForPlayer = expectedPlayerSeasonStats[index];
        expect(columnElements.textContent).toBe(statsForPlayer[columnToSelect].toString());
      });
      const allColumnsInBodyRows = nativeElement.querySelectorAll(statsTableBodyCellSelector);
      verifyStatsTableBodyContents(expectedPlayerSeasonStats, expectedStandardStatisticsKeys, allColumnsInBodyRows);
    });

    it('should sort the statistics ascending when sorting by player name', () => {
      const validSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const unselectedTableHeaderColumns: NodeListOf<HTMLTableHeaderCellElement> = nativeElement.querySelectorAll(statsTableUnselectedHeaderCellSelector);
      const columnToSelect = 'Player';
      let playerNameColumn: HTMLTableHeaderCellElement;
      unselectedTableHeaderColumns.forEach(tableHeaderColumn => {
        if (tableHeaderColumn.textContent === columnToSelect) {
          playerNameColumn = tableHeaderColumn;
        }
      });
      playerNameColumn.click();
      fixture.detectChanges();

      const expectedPlayerSeasonStats = [playerNumber4, playerNumber3];
      const selectedColumnElementsInBodyRows = getSelectedTableBodyCells(columnToSelect);
      expect(selectedColumnElementsInBodyRows.length).toBe(expectedPlayerSeasonStats.length);
      selectedColumnElementsInBodyRows.forEach((columnElements, index) => {
        const statsForPlayer = expectedPlayerSeasonStats[index];
        expect(columnElements.textContent).toBe(statsForPlayer[columnToSelect].toString());
      });
      const allColumnsInBodyRows = nativeElement.querySelectorAll(statsTableBodyCellSelector);
      verifyStatsTableBodyContents(expectedPlayerSeasonStats, expectedStandardStatisticsKeys, allColumnsInBodyRows);
    });

    it('should sort the statistics descending when sorting by statistic', () => {
      const validSeason = 'Fall 2019-2020';
      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const unselectedTableHeaderColumns: NodeListOf<HTMLTableHeaderCellElement> = nativeElement.querySelectorAll(statsTableUnselectedHeaderCellSelector);
      const columnToSelect = 'SB';
      let playerNameColumn: HTMLTableHeaderCellElement;
      unselectedTableHeaderColumns.forEach(tableHeaderColumn => {
        if (tableHeaderColumn.textContent === columnToSelect) {
          playerNameColumn = tableHeaderColumn;
        }
      });
      playerNameColumn.click();
      fixture.detectChanges();

      const expectedPlayerSeasonStats = [playerNumber8, playerNumber6];
      const selectedColumnElementsInBodyRows = getSelectedTableBodyCells(columnToSelect);
      expect(selectedColumnElementsInBodyRows.length).toBe(expectedPlayerSeasonStats.length);
      selectedColumnElementsInBodyRows.forEach((columnElements, index) => {
        const statsForPlayer = expectedPlayerSeasonStats[index];
        expect(columnElements.textContent).toBe(statsForPlayer[columnToSelect].toString());
      });
      const allColumnsInBodyRows = nativeElement.querySelectorAll(statsTableBodyCellSelector);
      verifyStatsTableBodyContents(expectedPlayerSeasonStats, expectedStandardStatisticsKeys, allColumnsInBodyRows);
    });

    it('should sort the statistics in reverse order of selected stat when the same stat is selected', () => {
      const validSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const unselectedTableHeaderColumns: NodeListOf<HTMLTableHeaderCellElement> = nativeElement.querySelectorAll(statsTableUnselectedHeaderCellSelector);
      const columnToSelect = 'Player';
      let playerNameColumn: HTMLTableHeaderCellElement;
      unselectedTableHeaderColumns.forEach(tableHeaderColumn => {
        if (tableHeaderColumn.textContent === columnToSelect) {
          playerNameColumn = tableHeaderColumn;
        }
      });
      playerNameColumn.click();
      fixture.detectChanges();
      playerNameColumn.click();
      fixture.detectChanges();

      const expectedPlayerSeasonStats = [playerNumber3, playerNumber4];
      const selectedHeaderColumns = nativeElement.querySelectorAll(statsTableSelectedHeaderCellSelector);
      expect(selectedHeaderColumns.length).toBe(1);
      const selectedColumnElementsInBodyRows = getSelectedTableBodyCells(columnToSelect);
      expect(selectedColumnElementsInBodyRows.length).toBe(expectedPlayerSeasonStats.length);
      selectedColumnElementsInBodyRows.forEach((columnElements, index) => {
        const statsForPlayer = expectedPlayerSeasonStats[index];
        expect(columnElements.textContent).toBe(statsForPlayer[columnToSelect].toString());
      });
      const allColumnsInBodyRows = nativeElement.querySelectorAll(statsTableBodyCellSelector);
      verifyStatsTableBodyContents(expectedPlayerSeasonStats, expectedStandardStatisticsKeys, allColumnsInBodyRows);
    });

    it('should return the statistics to the original order when selecting a statistic three times', () => {
      const validSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const unselectedTableHeaderColumns: NodeListOf<HTMLTableHeaderCellElement> = nativeElement.querySelectorAll(statsTableUnselectedHeaderCellSelector);
      const columnToSelect = 'Player';
      let playerNameColumn: HTMLTableHeaderCellElement;
      unselectedTableHeaderColumns.forEach(tableHeaderColumn => {
        if (tableHeaderColumn.textContent === columnToSelect) {
          playerNameColumn = tableHeaderColumn;
        }
      });
      playerNameColumn.click();
      fixture.detectChanges();
      playerNameColumn.click();
      fixture.detectChanges();
      playerNameColumn.click();
      fixture.detectChanges();

      const selectedHeaderColumns = nativeElement.querySelectorAll(statsTableSelectedHeaderCellSelector);
      expect(selectedHeaderColumns.length).toBe(0);

      const expectedPlayerSeasonStats = statisticsToReturn[validSeason];
      const allColumnsInBodyRows = nativeElement.querySelectorAll(statsTableBodyCellSelector);
      verifyStatsTableBodyContents(expectedPlayerSeasonStats, expectedStandardStatisticsKeys, allColumnsInBodyRows);
    });

    it('should be sorted by the same statistic when changing seasons', () => {
      const validSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const unselectedTableHeaderColumns: NodeListOf<HTMLTableHeaderCellElement> = nativeElement.querySelectorAll(statsTableUnselectedHeaderCellSelector);
      const columnToSelect = 'Player';
      let playerNameColumn: HTMLTableHeaderCellElement;
      unselectedTableHeaderColumns.forEach(tableHeaderColumn => {
        if (tableHeaderColumn.textContent === columnToSelect) {
          playerNameColumn = tableHeaderColumn;
        }
      });
      playerNameColumn.click();
      fixture.detectChanges();
      const newValidSeason = 'Fall 2019-2020';
      store.dispatch(new statisticActions.ChangeSeason(newValidSeason));
      fixture.detectChanges();

      const selectedHeaderColumns = nativeElement.querySelectorAll(statsTableSelectedHeaderCellSelector);
      expect(selectedHeaderColumns.length).toBe(1);

      const expectedPlayerSeasonStats = [playerNumber8, playerNumber6];
      const selectedColumnElementsInBodyRows = getSelectedTableBodyCells(columnToSelect);
      expect(selectedColumnElementsInBodyRows.length).toBe(expectedPlayerSeasonStats.length);
      selectedColumnElementsInBodyRows.forEach((columnElements, index) => {
        const statsForPlayer = expectedPlayerSeasonStats[index];
        expect(columnElements.textContent).toBe(statsForPlayer[columnToSelect].toString());
      });
      const allColumnsInBodyRows = nativeElement.querySelectorAll(statsTableBodyCellSelector);
      verifyStatsTableBodyContents(expectedPlayerSeasonStats, expectedStandardStatisticsKeys, allColumnsInBodyRows);
    });

    it('should have a tooltip on the headers for what the abbreviations stand for', () => {
      const validSeason = 'Spring 2019';
      store.dispatch(new statisticActions.ChangeSeason(validSeason));
      fixture.detectChanges();

      const expectedTooltips = ['', '', 'Games', 'At Bats', 'Runs', 'Hits', 'Doubles', 'Triples', 'Homeruns', 'Runs Batted In', 'Base On Balls', 'Strikeouts', 'Stolen Bases', 'Caught Stealing', 'Average', 'On-Base Percentage', 'Slugging Percentage', 'On-Base Plus Slugging', 'Intentional Walks', 'Hit By Pitch', 'Sacrifice Bunts', 'Sacrifice Flys', 'Total Bases', 'Extra Base Hits', 'Grounded Into Double Play', 'Ground Outs', 'Fly Outs', 'Ground Outs Per Fly Out', 'Plate Appearances', 'Average on Balls in Play', 'Isolated Power', 'At Bats per Home Run', 'Walk to Strikout Ratio', 'Walk Percentage', 'Strikeout Percentage'];
      const tableHeaderColumns = nativeElement.querySelectorAll(statsTableHeaderCellSelector);
      tableHeaderColumns.forEach((tableHeaderColumn, index) => {        
        const tooltipMessage = tableHeaderColumn.getAttribute("ng-reflect-message");
        expect(tooltipMessage).toBe(expectedTooltips[index]);
      });
    });
  });
});
