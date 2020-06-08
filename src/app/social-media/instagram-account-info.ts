import { ISocialMediaAccountInfo } from '../interfaces/i-social-media-account-info';

export class InstagramAccountInfo implements ISocialMediaAccountInfo{
    linkToAccount = 'https://www.instagram.com/saints.baseball/';
    linkTitle = 'Follow us on Instagram';
    imageSource = '../../assets/instagramLogo.png';
    imageAlternate = 'Instagram';
}
