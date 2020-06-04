import * as sinon from 'sinon';
import { IRequestService } from '../interfaces/i-request-service';
import { of, throwError } from 'rxjs';

export class RequestServiceMock implements IRequestService {
  getReturnValues: any[][] = [];

  get = sinon.spy(() => {
    const returnValueArray = this.getReturnValues.shift();
    if (!returnValueArray) {
      return of();
    }

    const error = returnValueArray[0];
    const data = returnValueArray[1];

    if (error) {
      return throwError(error);
    }

    return of(data);
  });
}
