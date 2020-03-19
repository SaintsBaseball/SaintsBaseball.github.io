import { SocialMediaAccountInfo } from './social-media-account-info';

describe('SocialMediaAccountInfo', () => {
  it('should create the instance of the class', () => {
    const linkToAccount = 'http://wikipedia.com';
    const linkTitle = 'title';
    const imageSource = '../../image/src';
    const imageAlternate = 'Alternate Image';

    const socialMediaAccountInfo = new SocialMediaAccountInfo(linkToAccount, linkTitle, imageSource, imageAlternate);

    expect(socialMediaAccountInfo.linkToAccount).toBe(linkToAccount);
    expect(socialMediaAccountInfo.linkTitle).toBe(linkTitle);
    expect(socialMediaAccountInfo.imageSource).toBe(imageSource);
    expect(socialMediaAccountInfo.imageAlternate).toBe(imageAlternate);
  });
});
