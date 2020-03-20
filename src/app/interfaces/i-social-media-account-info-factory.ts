import { ISocialMediaAccountInfo } from './i-social-media-account-info';

export interface ISocialMediaAccountInfoFactory {
    create(socialMediaAccountInfoToCreate: string): ISocialMediaAccountInfo;
}
