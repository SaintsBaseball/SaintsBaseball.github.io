import { ISocialMediaAccountInfo } from '../interfaces/i-social-media-account-info';

export class FacebookAccountInfo implements ISocialMediaAccountInfo {
  linkToAccount = 'https://www.facebook.com/SaintsBaseball760/';
  linkTitle = 'Like us on Facebook';
  imageSource = '../../assets/facebookLogo.png';
  imageAlternate = 'Facebook';
}
