import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlayersShellComponent } from './players-shell.component';
import { PlayersListComponent } from '../../components/players-list/players-list.component';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import { take } from 'rxjs/operators';
import { StoreModule, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/state';
import { reducer as appReducer } from 'src/app/state/app.reducer';
import * as appActions from 'src/app/state/app.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayerHittingStatistics } from '../../../classes/player-hitting-statistics';
import { MaterialModule } from 'src/app/material/material.module';

describe('PlayersShellComponent', () => {
  let playersShellComponent: PlayersShellComponent;
  let fixture: ComponentFixture<PlayersShellComponent>;
  let nativeElement: HTMLElement;
  let store: Store<fromRoot.State>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlayersShellComponent,
        PlayersListComponent
      ],
      imports: [
        SharedModule,
        StoreModule.forRoot({
          appState: appReducer
        }),
        MaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersShellComponent);
    playersShellComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(playersShellComponent).toBeTruthy();
  });

  it('should have the title in the header', () => {
    expect(playersShellComponent.title).toBe('Saints Players');
    expect(nativeElement.querySelector('h1').textContent).toBe(playersShellComponent.title);
  });

  it('should have the players list', () => {
    expect(nativeElement.querySelector('players-list')).toBeTruthy();
  });

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
    }
  ];

  const statsForEachPlayerToReturn = new Map<string, Map<string, PlayerHittingStatistics>>();
  const statsForAlpha = new Map<string, PlayerHittingStatistics>();
  statsForAlpha.set('Spring 2019', statisticsToReturn['Spring 2019'][1]);
  const statsForBeta = new Map<string, PlayerHittingStatistics>();
  statsForBeta.set('Fall 2019-2020', statisticsToReturn['Fall 2019-2020'][0]);
  statsForBeta.set('Spring 2019', statisticsToReturn['Spring 2019'][0]);
  const statsForCharlie = new Map<string, PlayerHittingStatistics>();
  statsForCharlie.set('Fall 2019-2020', statisticsToReturn['Fall 2019-2020'][1]);
  statsForEachPlayerToReturn.set('Alpha', statsForAlpha);
  statsForEachPlayerToReturn.set('Beta', statsForBeta);
  statsForEachPlayerToReturn.set('Charlie', statsForCharlie);

  describe('ngOnInit', () => {
    it('should populate the error message if failed to load hitting statistics', (done) => {
      store.dispatch(new appActions.LoadHittingStatisticsFail());

      playersShellComponent.ngOnInit();

      const defaultStats = new Map<string, Map<string, PlayerHittingStatistics>>();
      playersShellComponent.statsForEachPlayer$.pipe(take(1)).subscribe(stats => {
        expect(stats).toEqual(defaultStats);

        playersShellComponent.errorMessage$.pipe(take(1)).subscribe(errorMessage => {
          expect(errorMessage).toBe('Could not load hitting statistics');
          done();
        });
      });
    });

    it('should update the stats for each player on successful load', (done) => {
      store.dispatch(new appActions.FormatHittingStatisticsSuccess(statsForEachPlayerToReturn));

      playersShellComponent.ngOnInit();

      playersShellComponent.statsForEachPlayer$.pipe(take(1)).subscribe(statsForEachPlayer => {
        expect(statsForEachPlayer).toBe(statsForEachPlayerToReturn);
        done();
      });
    });
  });

  describe('players-list', () => {
    const playersListSelector = 'mat-list';
    const playersListItemSelector = 'mat-list-item';

    it('should have an empty list when the players are not loaded', () => {
      playersShellComponent.ngOnInit();
      fixture.detectChanges();

      expect(nativeElement.querySelector(playersListSelector)).toBeTruthy();
      const allOptionsInDropdown = nativeElement.querySelectorAll(playersListItemSelector);
      expect(allOptionsInDropdown.length).toBe(0);
    });

    it('should have a list of all players when the players are loaded', () => {
      store.dispatch(new appActions.FormatHittingStatisticsSuccess(statsForEachPlayerToReturn));

      playersShellComponent.ngOnInit();
      fixture.detectChanges();

      expect(nativeElement.querySelector(playersListSelector)).toBeTruthy();
      const allPlayersInList = nativeElement.querySelectorAll(playersListItemSelector);
      const expectedTotalNumberOfPlayers = 3;
      expect(allPlayersInList.length).toBe(expectedTotalNumberOfPlayers);
      expect(allPlayersInList[0].textContent).toBe('Alpha');
      expect(allPlayersInList[1].textContent).toBe('Beta');
      expect(allPlayersInList[2].textContent).toBe('Charlie');
    });

    it('should not have a modal when no player has been selected', () => {
      store.dispatch(new appActions.FormatHittingStatisticsSuccess(statsForEachPlayerToReturn));

      playersShellComponent.ngOnInit();
      fixture.detectChanges();

      const modalHeader = nativeElement.querySelector('div.modal div.modal-content h2');
      expect(modalHeader).toBeFalsy();
    });

    it('should open a modal with the player name and number in the header', () => {
      store.dispatch(new appActions.FormatHittingStatisticsSuccess(statsForEachPlayerToReturn));
      playersShellComponent.ngOnInit();
      fixture.detectChanges();

      const allOptionsInDropdown: NodeListOf<HTMLUListElement> = nativeElement.querySelectorAll(playersListItemSelector);
      allOptionsInDropdown[1].click();
      fixture.detectChanges();

      const modalHeader = nativeElement.querySelector('div.modal div.modal-content h2');
      expect(modalHeader).toBeTruthy();
      expect(modalHeader.textContent).toBe('Beta #1');
    });

    it('should have an X to close the modal', () => {
      store.dispatch(new appActions.FormatHittingStatisticsSuccess(statsForEachPlayerToReturn));
      playersShellComponent.ngOnInit();
      fixture.detectChanges();

      const allOptionsInDropdown: NodeListOf<HTMLUListElement> = nativeElement.querySelectorAll(playersListItemSelector);
      allOptionsInDropdown[0].click();
      fixture.detectChanges();

      const closeModalButton: HTMLButtonElement = nativeElement.querySelector('div.modal div.modal-content span.close');
      expect(closeModalButton).toBeTruthy();
      expect(closeModalButton.textContent).toBe('×');

      closeModalButton.click();
      fixture.detectChanges();

      const modalHeader = nativeElement.querySelector('div.modal div.modal-content h2');
      expect(modalHeader).toBeFalsy();
    });

    it('should open a modal with a table of the stats for the player', () => {
      store.dispatch(new appActions.FormatHittingStatisticsSuccess(statsForEachPlayerToReturn));
      playersShellComponent.ngOnInit();
      fixture.detectChanges();

      const allOptionsInDropdown: NodeListOf<HTMLUListElement> = nativeElement.querySelectorAll(playersListItemSelector);
      allOptionsInDropdown[1].click();
      fixture.detectChanges();

      const expectedNumberOfColumns = 34;
      const expectedNumberOfRows = 2;
      const modalTableHeaderRow = nativeElement.querySelector('div.modal div.modal-content table thead tr');
      expect(modalTableHeaderRow).toBeTruthy();
      const modalTableHeaderElements = nativeElement.querySelectorAll('div.modal div.modal-content table thead tr th');
      expect(modalTableHeaderElements).toBeTruthy();
      expect(modalTableHeaderElements.length).toBe(expectedNumberOfColumns);
      modalTableHeaderElements.forEach((element, index) => {
        if (index === 0) {
          expect(element.textContent).toBe('Season');
        } else {
          expect(element.textContent).toBe(Object.keys(statisticsToReturn['Fall 2019-2020'][0])[index + 1]);
        }
      });
      const modalTableBody = nativeElement.querySelector('div.modal div.modal-content table tbody');
      expect(modalTableBody).toBeTruthy();
      const modalTableBodyRows = nativeElement.querySelectorAll('div.modal div.modal-content table tbody tr');
      expect(modalTableBodyRows).toBeTruthy();
      expect(modalTableBodyRows.length).toBe(expectedNumberOfRows);
      const modalTableBodyElements = nativeElement.querySelectorAll('div.modal div.modal-content table tbody tr td');
      expect(modalTableBodyElements).toBeTruthy();
      expect(modalTableBodyElements.length).toBe(expectedNumberOfColumns * expectedNumberOfRows);
      modalTableBodyElements.forEach((element, index) => {
        if (index === 0) {
          expect(element.textContent).toBe('Fall 2019-2020');
        } else if (index < expectedNumberOfColumns) {
          expect(element.textContent).toBe(Object.values(statisticsToReturn['Fall 2019-2020'][0])[index + 1].toString());
        } else if (index === expectedNumberOfColumns) {
          expect(element.textContent).toBe('Spring 2019');
        } else {
          expect(element.textContent).toBe(Object.values(statisticsToReturn['Spring 2019'][0])[index - expectedNumberOfColumns + 1].toString());
        }
      });
    });
  });
});
