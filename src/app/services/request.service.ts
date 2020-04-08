import { Injectable } from '@angular/core';
import { IRequestService } from '../interfaces/i-request-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService implements IRequestService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    this.http.get<any>(url);
  }
}
