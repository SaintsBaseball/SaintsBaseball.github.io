import { Injectable } from '@angular/core';
import { ISocialMediaAccountInfo } from '../interfaces/i-social-media-account-info';
import { InstagramAccountInfo } from './instagram-account-info';
import { FacebookAccountInfo } from './facebook-account-info';
import { ISocialMediaAccountInfoFactoryService } from '../interfaces/i-social-media-account-info-factory-service';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaAccountInfoFactoryService implements ISocialMediaAccountInfoFactoryService {
  private socialMediaAccountInfoDictionary = {
    facebook: FacebookAccountInfo,
    instagram: InstagramAccountInfo
  };

  getAccountInfo(socialMediaAccountInfoToCreate: string): ISocialMediaAccountInfo {
    const socialMediaAccountInfoClassToCreate = this.socialMediaAccountInfoDictionary[socialMediaAccountInfoToCreate];
    return new socialMediaAccountInfoClassToCreate();
  }
}
