import { IRequestService } from '../interfaces/i-request-service';
import { Observable, of } from 'rxjs';

export class RequestServiceMock implements IRequestService {
  getReturnValues: any[][] = [];

  get<T>(url: string): Observable<T> {
    return of();
  };
}
