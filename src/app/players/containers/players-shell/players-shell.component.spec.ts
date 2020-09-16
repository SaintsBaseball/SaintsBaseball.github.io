import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersShellComponent } from './players-shell.component';
import { PlayersListComponent } from '../../components/players-list/players-list.component';
import { PlayerHittingStatisticsDatabaseTable } from 'src/app/in-memory-data-service/player-hitting-statistics-database-table';
import { take } from 'rxjs/operators';
import { StoreModule, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/state';
import { reducer as appReducer } from 'src/app/state/app.reducer';
import * as appActions from 'src/app/state/app.actions';
import { PlayerHittingStatistics } from 'src/app/classes/player-hitting-statistics';

describe('PlayersShellComponent', () => {
  let playersShellComponent: PlayersShellComponent;
  let fixture: ComponentFixture<PlayersShellComponent>;
  let nativeElement;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlayersShellComponent,
        PlayersListComponent
      ],
      imports: [
        StoreModule.forRoot({
          appState: appReducer
        })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersShellComponent);
    playersShellComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    store = TestBed.get(Store);
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

  describe('ngOnInit', () => {
    it('should format the statistics by player on successful load of statistics', () => {
      const statisticsToReturn = new PlayerHittingStatisticsDatabaseTable();
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
      statisticsToReturn["Spring 2019"] = [
        {
          '#': 4,
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
          Player: 'way diff name',
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
      store.dispatch(new appActions.LoadSuccess(statisticsToReturn));

      playersShellComponent.ngOnInit();

      const expectedHittingStatisticsByPlayer: Map<string, Map<string, PlayerHittingStatistics>> = new Map<string, Map<string, PlayerHittingStatistics>>();
      const playerOneMap = new Map<string, PlayerHittingStatistics>();
      playerOneMap.set('Fall 2019-2020', {
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
      });
      playerOneMap.set('Spring 2019', {
        '#': 4,
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
      });
      expectedHittingStatisticsByPlayer.set('name', playerOneMap);
      const playerTwoMap = new Map<string, PlayerHittingStatistics>();
      playerTwoMap.set('Fall 2019-2020', {
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
      });
      expectedHittingStatisticsByPlayer.set('other name', playerTwoMap);
      const playerThreeMap = new Map<string, PlayerHittingStatistics>();
      playerThreeMap.set('Spring 2019', {
        '#': 3,
        Player: 'way diff name',
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
      });
      expectedHittingStatisticsByPlayer.set('way diff name', playerThreeMap);

      expect(playersShellComponent.hittingStatisticsByPlayer).toEqual(expectedHittingStatisticsByPlayer);
    });

    it('should populate the error message if failed to load statistics', (done) => {
      playersShellComponent.ngOnInit();
      store.dispatch(new appActions.LoadFail());

      const defaultHittingStatisticsByPlayer: Map<string, Map<string, PlayerHittingStatistics>> = new Map<string, Map<string, PlayerHittingStatistics>>();
      expect(playersShellComponent.hittingStatisticsByPlayer).toEqual(defaultHittingStatisticsByPlayer);
      playersShellComponent.errorMessage$.pipe(take(1)).subscribe(errorMessage => {
        expect(errorMessage).toBe('Could not load statistics');
        done();
      });
    });
  });

  describe('players-list', () => {
    it('should have an empty list when the players are not loaded', () => {
      playersShellComponent.ngOnInit();
      fixture.detectChanges();

      expect(nativeElement.querySelector('ul')).toBeTruthy();
      const allOptionsInDropdown = nativeElement.querySelectorAll('li');
      expect(allOptionsInDropdown.length).toBe(0);
    });
  });
});
