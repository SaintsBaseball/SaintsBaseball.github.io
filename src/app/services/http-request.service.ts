import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRequestService } from '../interfaces/i-request-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService implements IRequestService {

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
}
