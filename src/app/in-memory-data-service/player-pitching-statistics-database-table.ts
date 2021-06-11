import { PlayerPitchingStatistics } from "../classes/player-pitching-statistics";
import { IPlayerStatisticsDatabaseTable } from "./i-player-statistics-database-table";

export class PlayerPitchingStatisticsDatabaseTable implements IPlayerStatisticsDatabaseTable {
  'Spring 2021'?: PlayerPitchingStatistics[];
}
