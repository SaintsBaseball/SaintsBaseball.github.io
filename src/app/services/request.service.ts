import { Injectable } from '@angular/core';
import { IRequestService } from '../interfaces/i-request-service';

@Injectable({
  providedIn: 'root'
})
export class RequestService implements IRequestService {

  constructor() { }
}
