import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarComponent } from './navigation-bar.component';

describe('NavigationBarComponent', () => {
  let fixture: ComponentFixture<NavigationBarComponent>;
  let navigationBarComponent: NavigationBarComponent;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationBarComponent ]
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
    let sidebarButton = nativeElement.querySelectorAll('.w3-top .w3-bar a.w3-bar-item')[1];

    sidebarButton.click();

    expect(navigationBarComponent.sidebarIsOpen).toBe(true);
  });
});
