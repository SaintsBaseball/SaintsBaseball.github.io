import { TestBed } from '@angular/core/testing';

import { SocialMediaAccountInfoFactoryService } from './social-media-account-info-factory.service';
import { InstagramAccountInfo } from './instagram-account-info';

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
  });
});
