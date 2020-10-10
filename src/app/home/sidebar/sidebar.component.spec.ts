import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import {AppComponent} from '../../app.component';
import {AppRoutingModule} from '../../app-routing.module';

describe('SidebarComponent', () => {
  let sidebarComponent: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        AppComponent
      ],
      imports: [
        AppRoutingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    sidebarComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(sidebarComponent).toBeTruthy();
  });

  it('should have the Sidebar Title at the top of the sidebar', function () {
    expect(sidebarComponent.title).toBe('Menu');
    expect(nativeElement.querySelector('nav.w3-sidebar h4.w3-bar-item b').textContent).toBe(sidebarComponent.title);
  });

  it('should have an X that closes the sidebar', function () {
    spyOn(sidebarComponent, 'closeSidebar');

    const xButton = nativeElement.querySelector('nav.w3-sidebar button');
    xButton.click();

    expect(sidebarComponent.closeSidebar).toHaveBeenCalledTimes(1);
  });

  it('should have a link to the stats page', function () {
    expect(nativeElement.querySelectorAll('nav.w3-sidebar a.w3-bar-item')[0].textContent).toBe('Statistics');
    expect(nativeElement.querySelectorAll('nav.w3-sidebar a.w3-bar-item')[0].href).toContain('/statistics');
  });

  it('should close the sidebar when navigating to the stats page', function () {
    spyOn(sidebarComponent, 'closeSidebar');

    const linkToStatsPage = nativeElement.querySelectorAll('nav.w3-sidebar a.w3-bar-item')[0];
    linkToStatsPage.click();

    expect(sidebarComponent.closeSidebar).toHaveBeenCalledTimes(1);
  });
});
