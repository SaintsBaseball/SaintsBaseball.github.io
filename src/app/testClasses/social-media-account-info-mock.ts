import { ISocialMediaAccountInfo } from '../interfaces/i-social-media-account-info';

export class SocialMediaAccountInfoMock implements ISocialMediaAccountInfo {
    linkToAccount = 'https://account_link/';
    linkTitle = 'title';
    imageSource = 'source_link';
    imageAlternate = 'alternate';
}
