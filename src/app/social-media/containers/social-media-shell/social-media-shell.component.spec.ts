import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SocialMediaShellComponent } from './social-media-shell.component';
import { SocialMediaAccountComponent } from '../../components/social-media-account/social-media-account.component';
import { SocialMediaAccountInfoFactoryServiceMock } from '../../../testClasses/social-media-account-info-factory-service-mock';
import { ISocialMediaAccountInfo } from 'src/app/interfaces/i-social-media-account-info';

describe('SocialMediaShellComponent', () => {
  let socialMediaShellComponent: SocialMediaShellComponent;
  let fixture: ComponentFixture<SocialMediaShellComponent>;
  let nativeElement: HTMLElement;
  let socialMediaAccountInfoFactoryServiceMock: SocialMediaAccountInfoFactoryServiceMock;

  beforeEach(waitForAsync(() => {
    socialMediaAccountInfoFactoryServiceMock = new SocialMediaAccountInfoFactoryServiceMock();

    TestBed.configureTestingModule({
      declarations: [
        SocialMediaShellComponent,
        SocialMediaAccountComponent
      ],
      providers: [
        {
          provide: 'ISocialMediaAccountInfoFactoryService',
          useValue: socialMediaAccountInfoFactoryServiceMock
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

  describe('ngOnInit', () => {
    let firstFakeSocialMediaAccountInfo: ISocialMediaAccountInfo;
    let secondFakeSocialMediaAccountInfo: ISocialMediaAccountInfo;

    beforeEach(() => {
      firstFakeSocialMediaAccountInfo = {
        linkToAccount: 'https://fakeurl.com/',
        linkTitle: 'title of first',
        imageSource: 'image_source_of_first',
        imageAlternate: 'alternate name for first'
      };
      secondFakeSocialMediaAccountInfo = {
        linkToAccount: 'https://anotherfakeurl.com/',
        linkTitle: 'title of second',
        imageSource: 'image_source_of_second',
        imageAlternate: 'alternate name for second'
      };
      spyOn(socialMediaAccountInfoFactoryServiceMock, 'getAccountInfo').and.returnValues(firstFakeSocialMediaAccountInfo, secondFakeSocialMediaAccountInfo);
    });

    it('should get the account info for each social media account', () => {
      socialMediaShellComponent.ngOnInit();

      expect(socialMediaAccountInfoFactoryServiceMock.getAccountInfo).toHaveBeenCalledTimes(2);
      expect(socialMediaAccountInfoFactoryServiceMock.getAccountInfo).toHaveBeenCalledWith('instagram');
      expect(socialMediaAccountInfoFactoryServiceMock.getAccountInfo).toHaveBeenCalledWith('facebook');
      expect(socialMediaShellComponent.instagramAccountInfo).toBe(firstFakeSocialMediaAccountInfo);
      expect(socialMediaShellComponent.facebookAccountInfo).toBe(secondFakeSocialMediaAccountInfo);
    });

    it('should show the account info for each social media account', () => {
      socialMediaShellComponent.ngOnInit();
      fixture.detectChanges();

      const allAccountLinks = nativeElement.querySelectorAll('a');
      const firstAccountLink = allAccountLinks[0];
      const secondAccountLink = allAccountLinks[1];
      expect(firstAccountLink.href).toBe(firstFakeSocialMediaAccountInfo.linkToAccount);
      expect(secondAccountLink.href).toBe(secondFakeSocialMediaAccountInfo.linkToAccount);
      expect(firstAccountLink.title).toBe(firstFakeSocialMediaAccountInfo.linkTitle);
      expect(secondAccountLink.title).toBe(secondFakeSocialMediaAccountInfo.linkTitle);
      
      const allAccountImages = nativeElement.querySelectorAll('img');
      const firstAccountImg = allAccountImages[0];
      const secondAccountImg = allAccountImages[1];
      expect(firstAccountImg.src.includes(firstFakeSocialMediaAccountInfo.imageSource)).toBeTrue();
      expect(secondAccountImg.src.includes(secondFakeSocialMediaAccountInfo.imageSource)).toBeTrue();
      expect(firstAccountImg.alt).toBe(firstFakeSocialMediaAccountInfo.imageAlternate);
      expect(secondAccountImg.alt).toBe(secondFakeSocialMediaAccountInfo.imageAlternate);
    });
  });
});
