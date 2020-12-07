import { ISocialMediaAccountInfo } from './i-social-media-account-info';

export interface ISocialMediaAccountInfoFactoryService {
    getAccountInfo(socialMediaAccountName: string): ISocialMediaAccountInfo;
}
