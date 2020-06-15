import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStatistics from '../../state';
import * as statisticActions from '../../state/statistic.actions';

@Component({
  selector: 'statistics-shell',
  templateUrl: './statistics-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsShellComponent implements OnInit {
  title: string = 'Saints Statistics';

  constructor(private store: Store<fromStatistics.State>) { }

  ngOnInit(): void {
    this.store.dispatch(new statisticActions.Load());
  }

}
