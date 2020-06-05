import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaWrapperComponent } from './social-media-wrapper.component';
import { SocialMediaAccountComponent } from '../social-media-account/social-media-account.component';
import { SocialMediaAccountInfoFactoryServiceMock } from '../../testClasses/social-media-account-info-factory-service-mock';

describe('SocialMediaWrapperComponent', () => {
  let socialMediaWrapperComponent: SocialMediaWrapperComponent;
  let fixture: ComponentFixture<SocialMediaWrapperComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SocialMediaWrapperComponent,
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
    fixture = TestBed.createComponent(SocialMediaWrapperComponent);
    socialMediaWrapperComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(socialMediaWrapperComponent).toBeTruthy();
  });

  it('should have the title', () => {
    expect(socialMediaWrapperComponent.title).toBe('Follow us on Social Media');
    expect(nativeElement.querySelector('h3').textContent).toBe(socialMediaWrapperComponent.title);
  });

  it('should render the social media accounts', () => {
    const socialMediaAccountComponent = nativeElement.querySelectorAll('social-media-account');
    expect(socialMediaAccountComponent[0]).toBeTruthy();
    expect(socialMediaAccountComponent[1]).toBeTruthy();
  });
});
