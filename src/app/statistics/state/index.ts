import * as fromRoot from '../../state/app.state';
import { StatisticState } from './statistic.reducer';

export interface State extends fromRoot.State {
  statistics: StatisticState
}