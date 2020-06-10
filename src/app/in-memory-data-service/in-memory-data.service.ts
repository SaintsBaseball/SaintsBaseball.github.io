import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SaintsDatabase } from './saints-database';
import * as stats from '../../../filebase/statisticsFileBase';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(): SaintsDatabase {
    return { stats };
  }
}
