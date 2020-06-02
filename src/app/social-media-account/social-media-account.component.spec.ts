import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaAccountComponent } from './social-media-account.component';
import { SocialMediaAccountInfoFactoryServiceMock } from '../testClasses/social-media-account-info-factory-service-mock';
import { SocialMediaAccountInfoMock } from '../testClasses/social-media-account-info-mock';

describe('SocialMediaAccountComponent', () => {
  let socialMediaAccountComponent: SocialMediaAccountComponent;
  let fixture: ComponentFixture<SocialMediaAccountComponent>;
  let nativeElement;
  let socialMediaAccountInfoFactoryServiceMock: SocialMediaAccountInfoFactoryServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocialMediaAccountComponent],
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
    fixture = TestBed.createComponent(SocialMediaAccountComponent);
    socialMediaAccountComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;

    socialMediaAccountInfoFactoryServiceMock = TestBed.get('ISocialMediaAccountInfoFactoryService')
  });

  it('should create', () => {
    expect(socialMediaAccountComponent).toBeTruthy();
    expect(socialMediaAccountInfoFactoryServiceMock.create.callCount).toBe(1);
  });

  it('should have a link to the social media account', () => {
    socialMediaAccountComponent.account = 'social media';
    const socialMediaAccountInfo = new SocialMediaAccountInfoMock();
    socialMediaAccountInfoFactoryServiceMock.createReturnValues.push(socialMediaAccountInfo);

    socialMediaAccountComponent.ngOnInit();
    fixture.detectChanges();

    expect(socialMediaAccountInfoFactoryServiceMock.create.callCount).toBe(2);
    expect(socialMediaAccountComponent.accountInfo).toBe(socialMediaAccountInfo);
    expect(nativeElement.querySelector('a').href).toBe(socialMediaAccountComponent.accountInfo.linkToAccount);
    expect(nativeElement.querySelector('a').title).toBe(socialMediaAccountComponent.accountInfo.linkTitle);
    const imageSourceWithNoRelativePath = socialMediaAccountComponent.accountInfo.imageSource.slice(6);
    expect(nativeElement.querySelector('img').src.includes(imageSourceWithNoRelativePath)).toBeTrue();
    expect(nativeElement.querySelector('img').alt).toBe(socialMediaAccountComponent.accountInfo.imageAlternate);
  });
});
