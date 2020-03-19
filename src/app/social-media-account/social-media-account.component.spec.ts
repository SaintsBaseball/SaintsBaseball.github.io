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
    socialMediaAccountComponent.socialMediaAccount = 'instagram';
    
    socialMediaAccountComponent.ngOnInit();
    fixture.detectChanges();

    expect(socialMediaAccountComponent.linkToAccount).toBe('https://www.instagram.com/saints.baseball/');
    expect(socialMediaAccountComponent.linkTitle).toBe('Follow us on Instagram');
    expect(socialMediaAccountComponent.imageSource).toBe('../../assets/instagramLogo.png');
    expect(socialMediaAccountComponent.imageAlternate).toBe('Instagram');
    expect(nativeElement.querySelector('a').href).toBe(socialMediaAccountComponent.linkToAccount);
    expect(nativeElement.querySelector('a').title).toBe(socialMediaAccountComponent.linkTitle);
    const imageSourceWithNoRelativePath = socialMediaAccountComponent.imageSource.slice(6);
    expect(nativeElement.querySelector('img').src.includes(imageSourceWithNoRelativePath)).toBeTrue();
    expect(nativeElement.querySelector('img').alt).toBe(socialMediaAccountComponent.imageAlternate);
  });

  it('should have a link to the facebook account', () => {
    socialMediaAccountComponent.socialMediaAccount = 'facebook';
    
    socialMediaAccountComponent.ngOnInit();
    fixture.detectChanges();

    expect(socialMediaAccountComponent.linkToAccount).toBe('https://www.facebook.com/SaintsBaseball760/');
    expect(socialMediaAccountComponent.linkTitle).toBe('Like us on Facebook');
    expect(socialMediaAccountComponent.imageSource).toBe('../../assets/facebookLogo.png');
    expect(socialMediaAccountComponent.imageAlternate).toBe('Facebook');
    expect(nativeElement.querySelector('a').href).toBe(socialMediaAccountComponent.linkToAccount);
    expect(nativeElement.querySelector('a').title).toBe(socialMediaAccountComponent.linkTitle);
    const imageSourceWithNoRelativePath = socialMediaAccountComponent.imageSource.slice(6);
    expect(nativeElement.querySelector('img').src.includes(imageSourceWithNoRelativePath)).toBeTrue();
    expect(nativeElement.querySelector('img').alt).toBe(socialMediaAccountComponent.imageAlternate);
  });
});
