import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

import { NavigationShellComponent } from './navigation-shell.component';

describe('NavigationShellComponent', () => {
  let navigationShellComponent: NavigationShellComponent;
  let fixture: ComponentFixture<NavigationShellComponent>;
  let nativeElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NavigationShellComponent,
        NavigationBarComponent,
        SidebarComponent
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
      const linkToHomePage = nativeElement.querySelector('.w3-top .w3-bar a#link-to-homepage');
      expect(linkToHomePage.textContent).toBe('Saints')
      // expect(linkToHomePage.href).toContain('')
    });
  });

  // it('should open the sidebar when the sidebar button is clicked', () => {
  //   expect(navigationBarComponent.sidebarIsOpen).toBe(false);
  //   let overlay = nativeElement.querySelector('div.w3-overlay');
  //   expect(overlay).toBeFalsy();
  //   let sidebarComponent = nativeElement.querySelector('sidebar');
  //   expect(sidebarComponent).toBeFalsy();

  //   const sidebarButton = nativeElement.querySelectorAll('.w3-top .w3-bar a.w3-bar-item')[1];
  //   sidebarButton.click();
  //   fixture.detectChanges();

  //   expect(navigationBarComponent.sidebarIsOpen).toBe(true);
  //   overlay = nativeElement.querySelector('div.w3-overlay');
  //   expect(overlay).toBeTruthy();
  //   sidebarComponent = nativeElement.querySelector('sidebar');
  //   expect(sidebarComponent).toBeTruthy();
  // });

  // it('should close the sidebar when the overlay is clicked', () => {
  //   navigationBarComponent.sidebarIsOpen = true;
  //   fixture.detectChanges();
  //   let sidebarComponent = nativeElement.querySelector('sidebar');
  //   expect(sidebarComponent).toBeTruthy();

  //   let overlay = nativeElement.querySelector('div.w3-overlay');
  //   overlay.click();
  //   fixture.detectChanges();

  //   expect(navigationBarComponent.sidebarIsOpen).toBe(false);
  //   overlay = nativeElement.querySelector('div.w3-overlay');
  //   expect(overlay).toBeFalsy();
  //   sidebarComponent = nativeElement.querySelector('sidebar');
  //   expect(sidebarComponent).toBeFalsy();
  // });
});
