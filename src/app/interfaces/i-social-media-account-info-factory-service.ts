import { ISocialMediaAccountInfo } from './i-social-media-account-info';

export interface ISocialMediaAccountInfoFactoryService {
    create(socialMediaAccountInfoToCreate: string): ISocialMediaAccountInfo;
}
