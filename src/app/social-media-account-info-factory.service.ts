import { Injectable } from '@angular/core';
import { SocialMediaAccountInfo } from './social-media-account-info';
import { InstagramAccountInfo } from './instagram-account-info';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaAccountInfoFactoryService {
  create(socialMediaAccountToCreate: string): SocialMediaAccountInfo {
    return new InstagramAccountInfo();
  }
}
