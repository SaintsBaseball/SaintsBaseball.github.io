import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationBarComponent} from './navigation-bar.component';
import {SidebarComponent} from "../sidebar/sidebar.component";

describe('NavigationBarComponent', () => {
  let fixture: ComponentFixture<NavigationBarComponent>;
  let navigationBarComponent: NavigationBarComponent;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationBarComponent, SidebarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    navigationBarComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(navigationBarComponent).toBeTruthy();
  });

  it('should have a link to the homepage with text Saints', () => {
    expect(navigationBarComponent.linkToHomepageText).toBe('Saints');
    expect(nativeElement.querySelectorAll('.w3-top .w3-bar a.w3-bar-item')[0].textContent).toBe(navigationBarComponent.linkToHomepageText)
  });

  it('should open the sidebar when the sidebar button is clicked', () => {
    expect(navigationBarComponent.sidebarIsOpen).toBe(false);
    let overlay = nativeElement.querySelector('div.w3-overlay');
    expect(overlay).toBeFalsy();
    let sidebarComponent = nativeElement.querySelector('sidebar');
    expect(sidebarComponent).toBeFalsy();

    let sidebarButton = nativeElement.querySelectorAll('.w3-top .w3-bar a.w3-bar-item')[1];

    sidebarButton.click();
    fixture.detectChanges();

    expect(navigationBarComponent.sidebarIsOpen).toBe(true);
    overlay = nativeElement.querySelector('div.w3-overlay');
    expect(overlay).toBeTruthy();
    sidebarComponent = nativeElement.querySelector('sidebar');
    expect(sidebarComponent).toBeTruthy();
  });

  it('should close the sidebar when the overlay is clicked', () => {
    navigationBarComponent.sidebarIsOpen = true;
    fixture.detectChanges();
    let overlay = nativeElement.querySelector('div.w3-overlay');
    let sidebarComponent = nativeElement.querySelector('sidebar');
    expect(sidebarComponent).toBeTruthy();

    overlay.click();
    fixture.detectChanges();

    expect(navigationBarComponent.sidebarIsOpen).toBe(false);
    overlay = nativeElement.querySelector('div.w3-overlay');
    expect(overlay).toBeFalsy();
    sidebarComponent = nativeElement.querySelector('sidebar');
    expect(sidebarComponent).toBeFalsy();
  });
});
