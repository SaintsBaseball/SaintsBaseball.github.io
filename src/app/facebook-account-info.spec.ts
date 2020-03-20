import { FacebookAccountInfo } from './facebook-account-info';

describe('FacebookAccountInfo', () => {
  it('should create an instance with the proper member variables', () => {
    const facebookAccountInfo = new FacebookAccountInfo();

    expect(facebookAccountInfo).toBeTruthy();
    expect(facebookAccountInfo.linkToAccount).toBe('https://www.facebook.com/SaintsBaseball760/');
    expect(facebookAccountInfo.linkTitle).toBe('Like us on Facebook');
    expect(facebookAccountInfo.imageSource).toBe('../../assets/facebookLogo.png');
    expect(facebookAccountInfo.imageAlternate).toBe('Facebook');

  });
});
