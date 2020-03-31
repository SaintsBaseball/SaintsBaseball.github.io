import * as sinon from 'sinon';

import { ISocialMediaAccountInfoFactoryService } from '../interfaces/i-social-media-account-info-factory-service';
import { ISocialMediaAccountInfo } from '../interfaces/i-social-media-account-info';

export class SocialMediaAccountInfoFactoryServiceMock implements ISocialMediaAccountInfoFactoryService {
  createReturnValues: ISocialMediaAccountInfo[] = [];

  create = sinon.spy(() => {
    return this.createReturnValues.shift();
  });
}
