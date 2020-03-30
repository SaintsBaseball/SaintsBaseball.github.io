import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as stats from '../../filebase/statisticsFileBase';
import { IDatabase } from './interfaces/i-database';

@Injectable({
  providedIn: 'root'
})
export class InMemoryStatsDataService implements InMemoryDbService {

  constructor() { }

  createDb(): IDatabase {
    return stats;
  }
}
