import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SocialMediaShellComponent } from './social-media-shell.component';
import { SocialMediaAccountComponent } from '../../components/social-media-account/social-media-account.component';
import { SocialMediaAccountInfoFactoryServiceMock } from '../../../testClasses/social-media-account-info-factory-service-mock';

describe('SocialMediaShellComponent', () => {
  let socialMediaShellComponent: SocialMediaShellComponent;
  let fixture: ComponentFixture<SocialMediaShellComponent>;
  let nativeElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SocialMediaShellComponent,
        SocialMediaAccountComponent
      ],
      providers: [
        {
          provide: 'ISocialMediaAccountInfoFactoryService',
          useClass: SocialMediaAccountInfoFactoryServiceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaShellComponent);
    socialMediaShellComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(socialMediaShellComponent).toBeTruthy();
  });

  it('should have the title', () => {
    expect(socialMediaShellComponent.title).toBe('Follow us on Social Media');
    expect(nativeElement.querySelector('h3').textContent).toBe(socialMediaShellComponent.title);
  });

  it('should render the social media accounts', () => {
    const socialMediaAccountComponent = nativeElement.querySelectorAll('social-media-account');
    expect(socialMediaAccountComponent[0]).toBeTruthy();
    expect(socialMediaAccountComponent[1]).toBeTruthy();
  });
});
