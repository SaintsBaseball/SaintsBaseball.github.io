import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';
import { NavigationSidebarComponent } from '../../components/navigation-sidebar/navigation-sidebar.component';
import { BlankComponent } from '../../../testClasses/blank-component';

import { NavigationShellComponent } from './navigation-shell.component';
import { NavigationOverlayComponent } from '../../components/navigation-overlay/navigation-overlay.component';
import { MaterialModule } from 'src/app/material/material.module';

describe('NavigationShellComponent', () => {
  let navigationShellComponent: NavigationShellComponent;
  let fixture: ComponentFixture<NavigationShellComponent>;
  let nativeElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NavigationShellComponent,
        NavigationBarComponent,
        NavigationSidebarComponent,
        NavigationOverlayComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'statistics', component: BlankComponent },
          { path: 'players', component: BlankComponent }
        ]),
        MaterialModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationShellComponent);
    navigationShellComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(navigationShellComponent).toBeTruthy();
  });

  describe('navigation-bar', () => {
    it('should have a link to the homepage with text Saints', () => {
      const linkToHomePage = nativeElement.querySelector('mat-toolbar > a#link-to-homepage');
      expect(linkToHomePage.textContent).toBe('Saints');
      expect(linkToHomePage.href.slice(-1)).toBe('/');
    });

    it('should open the sidebar when the sidebar button is clicked', () => {
      expect(navigationShellComponent.sidebarIsOpen).toBe(false);
      let overlay = nativeElement.querySelector('div.w3-overlay');
      expect(overlay).toBeFalsy();
      let sidebarComponent = nativeElement.querySelector('navigation-sidebar');
      expect(sidebarComponent).toBeFalsy();

      const sidebarButton = nativeElement.querySelector('mat-toolbar > button#sidebar-button');
      sidebarButton.click();
      fixture.detectChanges();

      expect(navigationShellComponent.sidebarIsOpen).toBe(true);
      overlay = nativeElement.querySelector('div.w3-overlay');
      expect(overlay).toBeTruthy();
      sidebarComponent = nativeElement.querySelector('navigation-sidebar');
      expect(sidebarComponent).toBeTruthy();
    });
  });

  describe('navigation-overlay', () => {
    it('should close the sidebar when the overlay is clicked', () => {
      navigationShellComponent.sidebarIsOpen = true;
      fixture.detectChanges();
      let sidebarComponent = nativeElement.querySelector('navigation-sidebar');
      expect(sidebarComponent).toBeTruthy();

      let overlay = nativeElement.querySelector('div.w3-overlay');
      overlay.click();
      fixture.detectChanges();

      expect(navigationShellComponent.sidebarIsOpen).toBe(false);
      overlay = nativeElement.querySelector('div.w3-overlay');
      expect(overlay).toBeFalsy();
      sidebarComponent = nativeElement.querySelector('navigation-sidebar');
      expect(sidebarComponent).toBeFalsy();
    });
  });

  describe('navigation-sidebar', () => {
    beforeEach(() => {
      navigationShellComponent.sidebarIsOpen = true;
      fixture.detectChanges();
    });

    it('should have the Sidebar Title at the top of the sidebar', () => {
      expect(nativeElement.querySelector('nav.w3-sidebar h4.w3-bar-item b').textContent).toBe('Menu');
    });
  
    it('should have an X that closes the sidebar', () => {
      const xButton = nativeElement.querySelector('nav.w3-sidebar button');
      xButton.click();
      fixture.detectChanges();
  
      expect(navigationShellComponent.sidebarIsOpen).toBe(false);
      const overlay = nativeElement.querySelector('div.w3-overlay');
      expect(overlay).toBeFalsy();
      const sidebarComponent = nativeElement.querySelector('navigation-sidebar');
      expect(sidebarComponent).toBeFalsy();
    });
  
    it('should have a link to the stats page', () => {
      const linkToStatsPage = nativeElement.querySelectorAll('nav.w3-sidebar a.w3-bar-item')[0];
      expect(linkToStatsPage.textContent).toBe('Statistics');
      expect(linkToStatsPage.href).toContain('/statistics');
    });
  
    it('should close the sidebar when navigating to the stats page', () => {  
      const linkToStatsPage = nativeElement.querySelectorAll('nav.w3-sidebar a.w3-bar-item')[0];
      linkToStatsPage.click();
      fixture.detectChanges();
  
      expect(navigationShellComponent.sidebarIsOpen).toBe(false);
      const overlay = nativeElement.querySelector('div.w3-overlay');
      expect(overlay).toBeFalsy();
      const sidebarComponent = nativeElement.querySelector('navigation-sidebar');
      expect(sidebarComponent).toBeFalsy();
    });
    
    it('should have a link to the players page', () => {
      const linkToPlayersPage = nativeElement.querySelectorAll('nav.w3-sidebar a.w3-bar-item')[1];
      expect(linkToPlayersPage.textContent).toBe('Players');
      expect(linkToPlayersPage.href).toContain('/players');
    });
  
    it('should close the sidebar when navigating to the players page', () => {
      const linkToStatsPage = nativeElement.querySelectorAll('nav.w3-sidebar a.w3-bar-item')[1];
      linkToStatsPage.click();
      fixture.detectChanges();
  
      expect(navigationShellComponent.sidebarIsOpen).toBe(false);
      const overlay = nativeElement.querySelector('div.w3-overlay');
      expect(overlay).toBeFalsy();
      const sidebarComponent = nativeElement.querySelector('navigation-sidebar');
      expect(sidebarComponent).toBeFalsy();
    });
  });
});
