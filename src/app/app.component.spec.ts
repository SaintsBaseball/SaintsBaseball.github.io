import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
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
import { PlayerHittingStatistics } from './classes/player-hitting-statistics';
import { SocialMediaAccountInfoFactoryServiceMock } from './testClasses/social-media-account-info-factory-service-mock';
import { SponsorComponent } from './sponsor/sponsor.component';
import { SocialMediaAccountComponent } from './social-media/components/social-media-account/social-media-account.component';
import { SocialMediaShellComponent } from './social-media/containers/social-media-shell/social-media-shell.component';
import { MaterialModule } from './material/material.module';
import { BlankComponent } from './testClasses/blank-component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let nativeElement;
  let statisticsServiceMock: StatisticsServiceMock;
  let store: Store<fromRoot.State>;

  beforeEach(async () => {
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

  describe('mat-toolbar', () => {
    let matToolbarElement;

    beforeEach(() => {
      matToolbarElement = nativeElement.querySelector('mat-toolbar');
      expect(matToolbarElement).toBeTruthy();
    });

    it('should have a link to the homepage with text Saints', () => {
      const linkToHomePage = matToolbarElement.querySelector('a.mat-button');
      expect(linkToHomePage.textContent).toBe('Saints');
      expect(linkToHomePage.href.slice(-1)).toBe('/');
    });

    it('should have a spacer between the link to the homepage and the sidebar toggle', () => {
      const spacer = matToolbarElement.querySelector('span.spacer');
      expect(spacer).toBeTruthy();
      expect(spacer.textContent).toBe('');
    });

    it('should have a menu icon for the sidebar toggle', () => {
      const sidebarToggleIcon = matToolbarElement.querySelector('button mat-icon');
      expect(sidebarToggleIcon).toBeTruthy();
      expect(sidebarToggleIcon.textContent).toBe('menu');
    });

    it('should open the sidebar when the sidebar button is clicked', () => {
      expect(appComponent.sidenavOpened).toBeFalse();
      let sidebarElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
      expect(sidebarElementOpened).toBeFalsy();

      const sidebarButton = matToolbarElement.querySelector('button');
      sidebarButton.click();
      fixture.detectChanges();

      expect(appComponent.sidenavOpened).toBeTrue();
      sidebarElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
      expect(sidebarElementOpened).toBeTruthy();
    });

    it('should close the sidebar when the sidebar button is clicked while the sidebar is open', () => {
      const sidebarButton = matToolbarElement.querySelector('button');
      sidebarButton.click();
      fixture.detectChanges();
      expect(appComponent.sidenavOpened).toBeTrue();
      let sidebarElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
      expect(sidebarElementOpened).toBeTruthy();

      sidebarButton.click();
      fixture.detectChanges();

      expect(appComponent.sidenavOpened).toBeFalse();
      sidebarElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
      expect(sidebarElementOpened).toBeFalsy();
    });
  });

  describe('mat-sidenav-container', () => {
    describe('mat-sidenav', () => {
      let matSidenavElement;

      beforeEach(() => {
        const sidebarButton = nativeElement.querySelector('mat-toolbar > button');
        sidebarButton.click();
        fixture.detectChanges();
        expect(appComponent.sidenavOpened).toBeTrue();
        const sidebarElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
        expect(sidebarElementOpened).toBeTruthy();

        matSidenavElement = nativeElement.querySelector('mat-sidenav-container > mat-sidenav');
        expect(matSidenavElement).toBeTruthy();
      });

      it('should have the Sidebar Title at the top of the sidebar', () => {
        expect(matSidenavElement.querySelector('h4 > b').textContent).toBe('Menu');
      });

      it('should have an X to closes the sidebar', () => {
        const xButtonIcon = matSidenavElement.querySelector('button mat-icon');
        expect(xButtonIcon).toBeTruthy();
        expect(xButtonIcon.textContent).toBe('close');
      });

      it('should close the sidebar when you click the X', () => {
        const xButton = matSidenavElement.querySelector('button');
        xButton.click();
        fixture.detectChanges();

        expect(appComponent.sidenavOpened).toBeFalse();
        const sidebarElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
        expect(sidebarElementOpened).toBeFalsy();
      });

      it('should have a link to the stats page', () => {
        const linkToStatsPage = matSidenavElement.querySelectorAll('a.mat-stroked-button')[0];
        expect(linkToStatsPage.textContent).toBe('Statistics');
        expect(linkToStatsPage.href).toContain('/statistics');
      });

      it('should close the sidebar when navigating to the stats page', () => {
        const linkToStatsPage = matSidenavElement.querySelectorAll('a.mat-stroked-button')[0];
        linkToStatsPage.click();
        fixture.detectChanges();

        expect(appComponent.sidenavOpened).toBeFalse();
        const sidebarElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
        expect(sidebarElementOpened).toBeFalsy();
      });

      it('should have a link to the players page', () => {
        const linkToPlayersPage = matSidenavElement.querySelectorAll('a.mat-stroked-button')[1];
        expect(linkToPlayersPage.textContent).toBe('Players');
        expect(linkToPlayersPage.href).toContain('/players');
      });

      it('should close the sidebar when navigating to the players page', () => {
        const linkToPlayersPage = matSidenavElement.querySelectorAll('a.mat-stroked-button')[1];
        linkToPlayersPage.click();
        fixture.detectChanges();

        expect(appComponent.sidenavOpened).toBeFalse();
        const sidebarElementOpened = nativeElement.querySelector('mat-sidenav-container > mat-sidenav.mat-drawer-opened');
        expect(sidebarElementOpened).toBeFalsy();
      });
    });

    describe('mat-sidenav-content', () => {
      let matSidenavContentElement;

      beforeEach(() => {
        matSidenavContentElement = nativeElement.querySelector('mat-sidenav-container > mat-sidenav-content');
        expect(matSidenavContentElement).toBeTruthy();
      });

      it('should have the wrapper contents with the router outlet', () => {
        expect(matSidenavContentElement.querySelector('div.w3-main')).toBeTruthy();
        expect(matSidenavContentElement.querySelector('div.w3-main > div.w3-row.w3-padding-64')).toBeTruthy();
        expect(matSidenavContentElement.querySelector('div.w3-main > div.w3-row.w3-padding-64 > div.w3-container')).toBeTruthy();
        expect(matSidenavContentElement.querySelector('div.w3-main > div.w3-row.w3-padding-64 > div.w3-container > router-outlet')).toBeTruthy();
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
