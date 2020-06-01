import { Observable } from 'rxjs';

export interface IStatisticsService {
    get<T>(url: string): Observable<T>
}
