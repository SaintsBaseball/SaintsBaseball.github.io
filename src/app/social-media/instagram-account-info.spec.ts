import { InstagramAccountInfo } from './instagram-account-info';

describe('InstagramAccountInfo', () => {
  it('should create an instance with the proper member variables', () => {
    const instagramAccountInfo = new InstagramAccountInfo();

    expect(instagramAccountInfo).toBeTruthy();
    expect(instagramAccountInfo.linkToAccount).toBe('https://www.instagram.com/saints.baseball/');
    expect(instagramAccountInfo.linkTitle).toBe('Follow us on Instagram');
    expect(instagramAccountInfo.imageSource).toBe('../../assets/instagramLogo.png');
    expect(instagramAccountInfo.imageAlternate).toBe('Instagram');
  });
});
