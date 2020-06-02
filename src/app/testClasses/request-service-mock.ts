import * as sinon from 'sinon';
import { IRequestService } from '../interfaces/i-request-service';
import { of } from 'rxjs';

export class RequestServiceMock implements IRequestService {
  getReturnValues: any[] = [];

  get = sinon.spy(() => {
    return of(this.getReturnValues.shift());
  });
}
