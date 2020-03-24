import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { MainContentComponent } from "./main-content/main-content.component";
import { SponsorComponent } from "./sponsor/sponsor.component";
import { SocialMediaAccountInfoFactoryServiceMock } from './testClasses/social-media-account-info-factory-service-mock';
import { SocialMediaWrapperComponent } from './social-media-wrapper/social-media-wrapper.component';
import { SocialMediaAccountComponent } from './social-media-account/social-media-account.component';

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
        SponsorComponent,
        SocialMediaWrapperComponent,
        SocialMediaAccountComponent
      ],
      providers: [
        {
          provide: 'ISocialMediaAccountInfoFactory',
          useClass: SocialMediaAccountInfoFactoryServiceMock
        }
      ]
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

  it('should render the social media wrapper', () => {
    expect(nativeElement.querySelector('social-media-wrapper')).toBeTruthy();
  });
});
