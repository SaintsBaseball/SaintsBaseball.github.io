import { Observable } from 'rxjs';

export interface IRequestService {
    get<T>(url: string): Observable<T>;
}
