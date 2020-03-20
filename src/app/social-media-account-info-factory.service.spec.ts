import { TestBed } from '@angular/core/testing';

import { SocialMediaAccountInfoFactoryService } from './social-media-account-info-factory.service';
import { InstagramAccountInfo } from './instagram-account-info';
import { FacebookAccountInfo } from './facebook-account-info';

describe('SocialMediaAccountInfoFactoryService', () => {
  let socialMediaAccountInfoFactoryService: SocialMediaAccountInfoFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    socialMediaAccountInfoFactoryService = TestBed.inject(SocialMediaAccountInfoFactoryService);
  });

  it('should be created', () => {
    expect(socialMediaAccountInfoFactoryService).toBeTruthy();
  });

  describe('create', () => {
    it('should create an instagram account info object', () => {
      const socialMediaAccountInfo = socialMediaAccountInfoFactoryService.create('instagram');

      expect(socialMediaAccountInfo).toBeInstanceOf(InstagramAccountInfo);
    });

    it('should create a facebook account info object', () => {
      const socialMediaAccountInfo = socialMediaAccountInfoFactoryService.create('facebook');

      expect(socialMediaAccountInfo).toBeInstanceOf(FacebookAccountInfo);
    });

    it('should throw an error if it tries to create a social media account that does not exist', () => {
      try {
        const socialMediaAccountInfo = socialMediaAccountInfoFactoryService.create('snapchat');
        expect(socialMediaAccountInfo).toBeFalsy();
      } catch(error) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });
});
