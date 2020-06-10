import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IDatabase } from './i-database';
import * as stats from '../../../filebase/statisticsFileBase';

@Injectable({
  providedIn: 'root'
})
export class InMemoryStatsDataService implements InMemoryDbService {

  constructor() { }

  createDb(): IDatabase {
    return { stats };
  }
}
