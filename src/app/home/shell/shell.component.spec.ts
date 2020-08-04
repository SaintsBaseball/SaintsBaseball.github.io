import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellComponent } from './shell.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { SponsorComponent } from '../sponsor/sponsor.component';
import { SocialMediaWrapperComponent } from 'src/app/social-media/social-media-wrapper/social-media-wrapper.component';
import { SocialMediaAccountComponent } from 'src/app/social-media/social-media-account/social-media-account.component';
import { SocialMediaAccountInfoFactoryServiceMock } from 'src/app/testClasses/social-media-account-info-factory-service-mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('ShellComponent', () => {
  let shellComponent: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShellComponent,
        NavigationBarComponent,
        SponsorComponent,
        SocialMediaWrapperComponent,
        SocialMediaAccountComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: 'ISocialMediaAccountInfoFactoryService',
          useClass: SocialMediaAccountInfoFactoryServiceMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    shellComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(shellComponent).toBeTruthy();
  });

  it('should render the navigation bar', () => {
    expect(nativeElement.querySelector('navigation-bar')).toBeTruthy();
  });

  it('should have the wrapper contents', () => {
    expect(nativeElement.querySelector('div.w3-main')).toBeTruthy();
    expect(nativeElement.querySelector('div.w3-main > div.w3-row.w3-padding-64')).toBeTruthy();
    expect(nativeElement.querySelector('div.w3-main > div.w3-row.w3-padding-64 > div.w3-container')).toBeTruthy();
  });

  it('should have the router outlet', () => {
    expect(nativeElement.querySelector('router-outlet')).toBeTruthy();
  });
  
  it('should render the social media wrapper', () => {
    expect(nativeElement.querySelector('social-media-wrapper')).toBeTruthy();
  });

  it('should render the sponsor info', () => {
    expect(nativeElement.querySelector('sponsor')).toBeTruthy();
  });
});
