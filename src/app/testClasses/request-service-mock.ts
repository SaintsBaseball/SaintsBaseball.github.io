import * as sinon from 'sinon';
import { IRequestService } from '../interfaces/i-request-service';
import { of } from 'rxjs';

export class RequestServiceMock implements IRequestService {
  getReturnValues: any[] = [];

  get = sinon.spy(() => {
    const returnValueArray = this.getReturnValues.shift();
    return of(returnValueArray);
  });
}
