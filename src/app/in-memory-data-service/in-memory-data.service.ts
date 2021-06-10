import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SaintsDatabase } from './saints-database';
import hittingStatistics from '../../../filebase/hittingStatisticsFilebase';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): SaintsDatabase {
    return { stats: hittingStatistics };
  }
}
