import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";
import {MainContentComponent} from "./main-content/main-content.component";
import {SponsorComponent} from "./sponsor/sponsor.component";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavigationBarComponent,
        MainContentComponent,
        SponsorComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  }));

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should render the navigation bar', () => {
    expect(nativeElement.querySelector('navigation-bar')).toBeTruthy();
  });

  it('should render the main content', () => {
    expect(nativeElement.querySelector('main-content')).toBeTruthy();
  });

  it('should render the sponsor info', () => {
    expect(nativeElement.querySelector('sponsor')).toBeTruthy();
  });
});
