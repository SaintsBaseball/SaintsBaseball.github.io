import { ISocialMediaAccountInfoFactoryService } from '../interfaces/i-social-media-account-info-factory-service';
import { ISocialMediaAccountInfo } from '../interfaces/i-social-media-account-info';

export class SocialMediaAccountInfoFactoryServiceMock implements ISocialMediaAccountInfoFactoryService {
  getAccountInfo(socialMediaAccountName: string): ISocialMediaAccountInfo {
    return null;
  };
}
