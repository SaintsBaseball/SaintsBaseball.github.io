import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as stats from '../../filebase/statisticsFileBase';

@Injectable({
  providedIn: 'root'
})
export class InMemoryStatsDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    return {
      'Fall 2019-2020': []
    };
  }
}
