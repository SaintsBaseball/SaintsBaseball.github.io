import { Injectable } from '@angular/core';
import { SocialMediaAccountInfo } from './social-media-account-info';
import { InstagramAccountInfo } from './instagram-account-info';
import { FacebookAccountInfo } from './facebook-account-info';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaAccountInfoFactoryService {
  private socialMediaAccountInfoDictionary = {
    facebook: FacebookAccountInfo,
    instagram: InstagramAccountInfo
  };

  create(socialMediaAccountInfoToCreate: string): SocialMediaAccountInfo {
    const socialMediaAccountInfoClassToCreate = this.socialMediaAccountInfoDictionary[socialMediaAccountInfoToCreate];
    return new socialMediaAccountInfoClassToCreate();
  }
}
