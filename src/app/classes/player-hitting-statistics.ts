import { IPlayerStatistics } from "../interfaces/i-player-statistics";

export class PlayerHittingStatistics implements IPlayerStatistics {
  '#': number;
  Player: string;
  G: number;
  AB: number;
  R: number;
  H: number;
  '2B': number;
  '3B': number;
  HR: number;
  RBI: number;
  BB: number;
  SO: number;
  SB: number;
  CS: number;
  AVG: string;
  OBP: string;
  SLG: string;
  OPS: string;
  PA: number;
  HBP: number;
  SAC: number;
  SF: number;
  GIDP: number;
  GO: number;
  AO: number;
  'GO/AO': string;
  XBH: number;
  TB: number;
  IBB: number;
  BABIP: string;
  ISO: string;
  'AB/HR': string;
  'BB/K': string;
  'BB%': string;
  'SO%': string;
}
