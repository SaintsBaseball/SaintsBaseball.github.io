import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SaintsDatabase } from './saints-database';
import * as stats from '../../../filebase/hittingStatisticsFileBase';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): SaintsDatabase {
    return { stats };
  }
}
