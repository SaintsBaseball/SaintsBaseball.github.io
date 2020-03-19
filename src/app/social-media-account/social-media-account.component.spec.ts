import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaAccountComponent } from './social-media-account.component';
import { inflateSync } from 'zlib';

describe('SocialMediaAccountComponent', () => {
  let socialMediaAccountComponent: SocialMediaAccountComponent;
  let fixture: ComponentFixture<SocialMediaAccountComponent>;

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
  });

  it('should create', () => {
    expect(socialMediaAccountComponent).toBeTruthy();
  });

  it('should have a link to the instagram account', () => {
    socialMediaAccountComponent.socialMediaAccount = 'instagram';

    expect(socialMediaAccountComponent.linkToAccount).toBe('https://www.instagram.com/saints.baseball/');
    expect(socialMediaAccountComponent.linkTitle).toBe('Follow us on Instagram');
    expect(socialMediaAccountComponent.imageSource).toBe('../../assets/instagramLogo.png');
    expect(socialMediaAccountComponent.imageAlternate).toBe('Instagram');
  });
});
