import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { take } from 'rxjs/operators';
import { StoreModule, select, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { AppEffects } from './state/app.effects';
import { PlayerHittingStatisticsDatabaseTable } from './in-memory-data-service/player-hitting-statistics-database-table';
import * as fromRoot from './state';
import { reducer } from './state/app.reducer';
import { PlayerHittingStatistics } from './classes/player-hitting-statistics';
import { SocialMediaAccountInfoFactoryServiceMock } from './testClasses/social-media-account-info-factory-service-mock';
import { SponsorComponent } from './sponsor/sponsor.component';
import { SocialMediaAccountComponent } from './social-media/components/social-media-account/social-media-account.component';
import { SocialMediaShellComponent } from './social-media/containers/social-media-shell/social-media-shell.component';
import { MaterialModule } from './material/material.module';
import { BlankComponent } from './testClasses/blank-component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { StatisticsServiceMock } from './testClasses/statistics-service-mock';
import { PlayerPitchingStatisticsDatabaseTable } from './in-memory-data-service/player-pitching-statistics-database-table';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let nativeElement: HTMLElement;
  let statisticsServiceMock: StatisticsServiceMock;
  let store: Store<fromRoot.State>;

  beforeEach(() => {
    statisticsServiceMock = new StatisticsServiceMock();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'statistics', component: BlankComponent },
          { path: 'players', component: BlankComponent }
        ]),
        StoreModule.forRoot({
          appState: reducer
        }),
        EffectsModule.forRoot([AppEffects]),
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: 'IStatisticsService',
          useValue: statisticsServiceMock
        },
        {
          provide: 'ISocialMediaAccountInfoFactoryService',
          useClass: SocialMediaAccountInfoFactoryServiceMock
        }
      ],
      declarations: [
        AppComponent,
        SponsorComponent,
        SocialMediaShellComponent,
        SocialMediaAccountComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    store = TestBed.inject(Store);
  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load the player hitting statistics', () => {
      spyOn(statisticsServiceMock, 'getPlayerHittingStatistics');

      appComponent.ngOnInit();

      expect(statisticsServiceMock.getPlayerHittingStatistics).toHaveBeenCalledTimes(1);
    });

    it('should load the player pitching statistics', () => {
      spyOn(statisticsServiceMock, 'getPlayerPitchingStatistics');

      appComponent.ngOnInit();

      expect(statisticsServiceMock.getPlayerPitchingStatistics).toHaveBeenCalledTimes(1);
    });

    it('should update the stores hitting statistics on successful load', (done) => {
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
      spyOn(statisticsServiceMock, 'getPlayerHittingStatistics').and.returnValue(of(statisticsToReturn));

      appComponent.ngOnInit();

      store.pipe(select(fromRoot.getPlayerHittingStatistics, take(1))).subscribe(stats => {
        expect(stats).toBe(statisticsToReturn);
        done();
      });
    });

    it('should update the stores pitching statistics on successful load', (done) => {
      const statisticsToReturn = new PlayerPitchingStatisticsDatabaseTable();
      statisticsToReturn['Spring 2021'] = [
        { "#": 4, "Player": "real estate", "W": 0, "L": 0, "ERA": ".--", "G": 0, "GS": 0, "CG": 0, "SHO": 0, "SV": 0, "SVO": 0, "IP": 0, "H": 0, "R": 0, "ER": 0, "HR": 0, "HB": 0, "BB": 0, "SO": 0, "AB": 0, "WHIP": ".--", "AVG": ".---", "TBF": 0, "NP": 0, "P/IP": ".--", "QS": 0, "GF": 0, "HLD": 0, "IBB": 0, "WP": 0, "BK": 0, "SF": 0, "GDP": 0, "GO": 0, "AO": 0, "GO/AO": ".--", "SO/9": ".--", "BB/9": ".--", "K/BB": ".--", "BABIP": ".---", "SB": 0, "CS": 0, "PK": 0 },
        { "#": 6, "Player": "yours truly", "W": 0, "L": 0, "ERA": ".--", "G": 0, "GS": 0, "CG": 0, "SHO": 0, "SV": 0, "SVO": 0, "IP": 0, "H": 0, "R": 0, "ER": 0, "HR": 0, "HB": 0, "BB": 0, "SO": 0, "AB": 0, "WHIP": ".--", "AVG": ".---", "TBF": 0, "NP": 0, "P/IP": ".--", "QS": 0, "GF": 0, "HLD": 0, "IBB": 0, "WP": 0, "BK": 0, "SF": 0, "GDP": 0, "GO": 0, "AO": 0, "GO/AO": ".--", "SO/9": ".--", "BB/9": ".--", "K/BB": ".--", "BABIP": ".---", "SB": 0, "CS": 0, "PK": 0 }
      ];
      spyOn(statisticsServiceMock, 'getPlayerPitchingStatistics').and.returnValue(of(statisticsToReturn));

      appComponent.ngOnInit();

      store.pipe(select(fromRoot.getPlayerPitchingStatistics, take(1))).subscribe(stats => {
        expect(stats).toBe(statisticsToReturn);
        done();
      });
    });

    it('should populate the error message if failed to load hitting statistics', (done) => {
      const getPlayerHittingStatisticsError = new Error('Some error');
      spyOn(statisticsServiceMock, 'getPlayerHittingStatistics').and.returnValue(throwError(getPlayerHittingStatisticsError));

      appComponent.ngOnInit();

      store.pipe(select(fromRoot.getPlayerHittingStatistics, take(1))).subscribe(stats => {
        const defaultStats = new PlayerHittingStatisticsDatabaseTable();
        expect(stats).toEqual(defaultStats);

        store.pipe(select(fromRoot.getStatsForEachPlayer, take(1))).subscribe(statsForEachPlayer => {
          const defaultStatsForEachPlayer = new Map<string, Map<string, PlayerHittingStatistics>>();
          expect(statsForEachPlayer).toEqual(defaultStatsForEachPlayer);

          store.pipe(select(fromRoot.getErrorMessage, take(1))).subscribe(errorMessage => {
            expect(errorMessage).toBe('Could not load hitting statistics');
            done();
          });
        });
      });
    });

    it('should populate the error message if failed to load pitching statistics', (done) => {
      const getPlayerPitchingStatisticsError = new Error('Some error');
      spyOn(statisticsServiceMock, 'getPlayerPitchingStatistics').and.returnValue(throwError(getPlayerPitchingStatisticsError));

      appComponent.ngOnInit();

      store.pipe(select(fromRoot.getPlayerPitchingStatistics, take(1))).subscribe(stats => {
        const defaultStats = new PlayerPitchingStatisticsDatabaseTable();
        expect(stats).toEqual(defaultStats);

        store.pipe(select(fromRoot.getErrorMessage, take(1))).subscribe(errorMessage => {
          expect(errorMessage).toBe('Could not load pitching statistics');
          done();
        });
      });
    });

    it('should update the statistics for each player on successful load', (done) => {
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
      spyOn(statisticsServiceMock, 'getPlayerHittingStatistics').and.returnValue(of(statisticsToReturn));

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

  describe('mat-toolbar', () => {
    let matToolbarElement: HTMLElement;

    beforeEach(() => {
      matToolbarElement = nativeElement.querySelector('mat-toolbar');
      expect(matToolbarElement).toBeTruthy();
    });

    it('should have a link to the homepage with text Saints', () => {
      const linkToHomePage: HTMLAnchorElement = matToolbarElement.querySelector('a.mat-button');
      expect(linkToHomePage.textContent).toBe('Saints');
      expect(linkToHomePage.href.slice(-1)).toBe('/');
    });

    it('should have a spacer between the link to the homepage and the sidenav toggle', () => {
      const spacer = matToolbarElement.querySelector('span.spacer');
      expect(spacer).toBeTruthy();
      expect(spacer.textContent).toBe('');
    });

    it('should have a menu icon for the sidenav toggle', () => {
      const sidenavToggleIcon = matToolbarElement.querySelector('button mat-icon');
      expect(sidenavToggleIcon).toBeTruthy();
      expect(sidenavToggleIcon.textContent).toBe('menu');
    });

    it('should open the sidenav when the sidenav button is clicked', () => {
      expect(appComponent.sidenavOpened).toBeFalse();
      let sidenavElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
      expect(sidenavElementOpened).toBeFalsy();

      const sidenavButton = matToolbarElement.querySelector('button');
      sidenavButton.click();
      fixture.detectChanges();

      expect(appComponent.sidenavOpened).toBeTrue();
      sidenavElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
      expect(sidenavElementOpened).toBeTruthy();
    });

    it('should close the sidenav when the sidenav button is clicked while the sidenav is open', () => {
      const sidenavButton = matToolbarElement.querySelector('button');
      sidenavButton.click();
      fixture.detectChanges();
      expect(appComponent.sidenavOpened).toBeTrue();
      let sidenavElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
      expect(sidenavElementOpened).toBeTruthy();

      sidenavButton.click();
      fixture.detectChanges();

      expect(appComponent.sidenavOpened).toBeFalse();
      sidenavElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
      expect(sidenavElementOpened).toBeFalsy();
    });

    it('should close the sidenav when the link to the homepage is clicked while the sidenav is open', () => {
      const sidenavButton = matToolbarElement.querySelector('button');
      sidenavButton.click();
      fixture.detectChanges();
      expect(appComponent.sidenavOpened).toBeTrue();
      let sidenavElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
      expect(sidenavElementOpened).toBeTruthy();

      const linkToHomePage: HTMLAnchorElement = matToolbarElement.querySelector('a.mat-button');
      linkToHomePage.click();
      fixture.detectChanges();

      expect(appComponent.sidenavOpened).toBeFalse();
      sidenavElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
      expect(sidenavElementOpened).toBeFalsy();
    });

    it('should not open the sidenav when the link to the homepage is clicked while the sidenav is closed', () => {
      expect(appComponent.sidenavOpened).toBeFalse();
      let sidenavElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
      expect(sidenavElementOpened).toBeFalsy();

      const linkToHomePage: HTMLAnchorElement = matToolbarElement.querySelector('a.mat-button');
      linkToHomePage.click();
      fixture.detectChanges();

      expect(appComponent.sidenavOpened).toBeFalse();
      sidenavElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
      expect(sidenavElementOpened).toBeFalsy();
    });
  });

  describe('mat-sidenav-container', () => {
    describe('mat-sidenav', () => {
      let matSidenavElement: HTMLElement;

      beforeEach(() => {
        const sidenavButton: HTMLButtonElement = nativeElement.querySelector('mat-toolbar > button');
        sidenavButton.click();
        fixture.detectChanges();
        expect(appComponent.sidenavOpened).toBeTrue();
        const sidenavElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
        expect(sidenavElementOpened).toBeTruthy();

        matSidenavElement = nativeElement.querySelector('mat-sidenav-container > mat-sidenav');
        expect(matSidenavElement).toBeTruthy();
      });

      it('should have the sidenav Title at the top of the sidenav', () => {
        expect(matSidenavElement.querySelector('h4 > b').textContent).toBe('Menu');
      });

      it('should have an X to closes the sidenav', () => {
        const xButtonIcon = matSidenavElement.querySelector('button mat-icon');
        expect(xButtonIcon).toBeTruthy();
        expect(xButtonIcon.textContent).toBe('close');
      });

      it('should close the sidenav when you click the X', () => {
        const xButton = matSidenavElement.querySelector('button');
        xButton.click();
        fixture.detectChanges();

        expect(appComponent.sidenavOpened).toBeFalse();
        const sidenavElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
        expect(sidenavElementOpened).toBeFalsy();
      });

      it('should have two links on the sidenav', () => {
        const linksOnSidenav = matSidenavElement.querySelectorAll('a');
        const linksOnSidenavThatAreMatStrokedButtons: NodeListOf<HTMLAnchorElement> = matSidenavElement.querySelectorAll('a.mat-stroked-button');

        expect(linksOnSidenav.length).toBe(2);
        expect(linksOnSidenavThatAreMatStrokedButtons.length).toBe(2);
        expect(linksOnSidenav).toEqual(linksOnSidenavThatAreMatStrokedButtons);
      });

      it('should have a link to the stats page', () => {
        const linksOnSidenav: NodeListOf<HTMLAnchorElement> = matSidenavElement.querySelectorAll('a.mat-stroked-button');
        const linkToStatsPage = linksOnSidenav[0];
        expect(linkToStatsPage.textContent).toBe('Statistics');
        expect(linkToStatsPage.href).toContain('/statistics');
      });

      it('should close the sidenav when navigating to the stats page', () => {
        const linksOnSidenav: NodeListOf<HTMLAnchorElement> = matSidenavElement.querySelectorAll('a.mat-stroked-button');
        const linkToStatsPage = linksOnSidenav[0];
        linkToStatsPage.click();
        fixture.detectChanges();

        expect(appComponent.sidenavOpened).toBeFalse();
        const sidenavElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
        expect(sidenavElementOpened).toBeFalsy();
      });

      it('should have a link to the players page', () => {
        const linksOnSidenav: NodeListOf<HTMLAnchorElement> = matSidenavElement.querySelectorAll('a.mat-stroked-button');
        const linkToPlayersPage = linksOnSidenav[1];
        expect(linkToPlayersPage.textContent).toBe('Players');
        expect(linkToPlayersPage.href).toContain('/players');
      });

      it('should close the sidenav when navigating to the players page', () => {
        const linksOnSidenav: NodeListOf<HTMLAnchorElement> = matSidenavElement.querySelectorAll('a.mat-stroked-button');
        const linkToPlayersPage = linksOnSidenav[1];
        linkToPlayersPage.click();
        fixture.detectChanges();

        expect(appComponent.sidenavOpened).toBeFalse();
        const sidenavElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
        expect(sidenavElementOpened).toBeFalsy();
      });
    });

    describe('mat-sidenav-content', () => {
      let matSidenavContentElement: HTMLElement;

      beforeEach(() => {
        matSidenavContentElement = nativeElement.querySelector('mat-sidenav-container > mat-sidenav-content');
        expect(matSidenavContentElement).toBeTruthy();
      });

      it('should have the wrapper contents with the router outlet', () => {
        const routerOutletElement = matSidenavContentElement.querySelector('router-outlet');
        expect(routerOutletElement).toBeTruthy();
      });

      it('should render the social media wrapper', () => {
        expect(matSidenavContentElement.querySelector('social-media-shell')).toBeTruthy();
      });

      it('should render the sponsor info', () => {
        expect(matSidenavContentElement.querySelector('sponsor')).toBeTruthy();
      });
    });
  });
});
