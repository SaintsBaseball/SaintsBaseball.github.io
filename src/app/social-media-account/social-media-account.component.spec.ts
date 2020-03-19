import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaAccountComponent } from './social-media-account.component';

describe('SocialMediaAccountComponent', () => {
  let socialMediaAccountComponent: SocialMediaAccountComponent;
  let fixture: ComponentFixture<SocialMediaAccountComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaAccountComponent);
    socialMediaAccountComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(socialMediaAccountComponent).toBeTruthy();
  });

  it('should have a link to the instagram account', () => {
    const expectedAccountInfo = {
      linkToAccount: 'https://www.instagram.com/saints.baseball/',
      linkTitle: 'Follow us on Instagram',
      imageSource: '../../assets/instagramLogo.png',
      imageAlternate: 'Instagram'
    };
    socialMediaAccountComponent.socialMediaAccount = 'instagram';
    
    socialMediaAccountComponent.ngOnInit();
    fixture.detectChanges();

    expect(socialMediaAccountComponent.accountInfo).toEqual(expectedAccountInfo);
    expect(nativeElement.querySelector('a').href).toBe(socialMediaAccountComponent.accountInfo.linkToAccount);
    expect(nativeElement.querySelector('a').title).toBe(socialMediaAccountComponent.accountInfo.linkTitle);
    const imageSourceWithNoRelativePath = socialMediaAccountComponent.accountInfo.imageSource.slice(6);
    expect(nativeElement.querySelector('img').src.includes(imageSourceWithNoRelativePath)).toBeTrue();
    expect(nativeElement.querySelector('img').alt).toBe(socialMediaAccountComponent.accountInfo.imageAlternate);
  });

  it('should have a link to the facebook account', () => {
    const expectedAccountInfo = {
      linkToAccount: 'https://www.facebook.com/SaintsBaseball760/',
      linkTitle: 'Like us on Facebook',
      imageSource: '../../assets/facebookLogo.png',
      imageAlternate: 'Facebook'
    };
    socialMediaAccountComponent.socialMediaAccount = 'facebook';
    
    socialMediaAccountComponent.ngOnInit();
    fixture.detectChanges();

    expect(socialMediaAccountComponent.accountInfo).toEqual(expectedAccountInfo);
    expect(socialMediaAccountComponent.accountInfo).toEqual(expectedAccountInfo);
    expect(nativeElement.querySelector('a').href).toBe(socialMediaAccountComponent.accountInfo.linkToAccount);
    expect(nativeElement.querySelector('a').title).toBe(socialMediaAccountComponent.accountInfo.linkTitle);
    const imageSourceWithNoRelativePath = socialMediaAccountComponent.accountInfo.imageSource.slice(6);
    expect(nativeElement.querySelector('img').src.includes(imageSourceWithNoRelativePath)).toBeTrue();
    expect(nativeElement.querySelector('img').alt).toBe(socialMediaAccountComponent.accountInfo.imageAlternate);
  });
});
