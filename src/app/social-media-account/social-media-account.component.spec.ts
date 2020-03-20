import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaAccountComponent } from './social-media-account.component';
import { SocialMediaAccountInfoFactoryServiceMock } from '../testClasses/social-media-account-info-factory-service-mock';
import { ISocialMediaAccountInfo } from '../interfaces/i-social-media-account-info';

describe('SocialMediaAccountComponent', () => {
  let socialMediaAccountComponent: SocialMediaAccountComponent;
  let fixture: ComponentFixture<SocialMediaAccountComponent>;
  let nativeElement;
  let socialMediaAccountInfoFactoryServiceMock: SocialMediaAccountInfoFactoryServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaAccountComponent ],
      providers: [
        {
          provide: 'ISocialMediaAccountInfoFactory',
          useClass: SocialMediaAccountInfoFactoryServiceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaAccountComponent);
    socialMediaAccountComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;

    socialMediaAccountInfoFactoryServiceMock = TestBed.get('ISocialMediaAccountInfoFactory')
  });

  it('should create', () => {
    expect(socialMediaAccountComponent).toBeTruthy();
  });

  it('should have a link to the social media account', () => {
    socialMediaAccountComponent.socialMediaAccount = 'social media';
    const socialMediaAccountInfo: ISocialMediaAccountInfo = {
      linkToAccount: 'https://account_link/',
      linkTitle: 'title',
      imageSource: 'source_link',
      imageAlternate: 'alternate'
    };
    socialMediaAccountInfoFactoryServiceMock.createReturnValues.push(socialMediaAccountInfo);
    
    socialMediaAccountComponent.ngOnInit();
    fixture.detectChanges();

    expect(socialMediaAccountComponent.accountInfo).toBe(socialMediaAccountInfo);
    expect(nativeElement.querySelector('a').href).toBe(socialMediaAccountComponent.accountInfo.linkToAccount);
    expect(nativeElement.querySelector('a').title).toBe(socialMediaAccountComponent.accountInfo.linkTitle);
    const imageSourceWithNoRelativePath = socialMediaAccountComponent.accountInfo.imageSource.slice(6);
    expect(nativeElement.querySelector('img').src.includes(imageSourceWithNoRelativePath)).toBeTrue();
    expect(nativeElement.querySelector('img').alt).toBe(socialMediaAccountComponent.accountInfo.imageAlternate);
  });
});
