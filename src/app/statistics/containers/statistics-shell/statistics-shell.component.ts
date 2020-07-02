import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStatistics from '../../state';
import * as statisticActions from '../../state/statistic.actions';
import { Observable } from 'rxjs';
import { StatisticsDatabaseTable } from 'src/app/in-memory-data-service/statistics-database-table';

@Component({
  selector: 'statistics-shell',
  templateUrl: './statistics-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsShellComponent implements OnInit {
  title: string = 'Saints Statistics';
  statistics$: Observable<StatisticsDatabaseTable>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromStatistics.State>) { }

  ngOnInit(): void {
    this.store.dispatch(new statisticActions.Load());

    this.statistics$ = this.store.pipe(select(fromStatistics.getStatistics));
    this.errorMessage$ = this.store.pipe(select(fromStatistics.getErrorMessage));
  }
}
