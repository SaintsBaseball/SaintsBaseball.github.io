import * as sinon from 'sinon';
import { IRequestService } from '../interfaces/i-request-service';

export class RequestServiceMock implements IRequestService {
  getReturnValues: any[] = [];

  get = sinon.spy(() => {
    return this.getReturnValues.shift();
  });
}
