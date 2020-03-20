import * as sinon from 'sinon';

import { ISocialMediaAccountInfoFactory } from '../interfaces/i-social-media-account-info-factory';
import { ISocialMediaAccountInfo } from '../interfaces/i-social-media-account-info';

export class SocialMediaAccountInfoFactoryServiceMock implements ISocialMediaAccountInfoFactory {
  createReturnValues: ISocialMediaAccountInfo[] = [];

  create = sinon.spy(() => {
    return this.createReturnValues.shift();
  });
}
