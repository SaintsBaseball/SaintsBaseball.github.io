import { Pipe, PipeTransform } from '@angular/core';
import { StatisticType } from 'src/app/types/statistic-type';

const commonAbbreviationToStatisticDictionary = {
  G: 'Games',
  R: 'Runs', 
  H: 'Hits', 
  HR: 'Home Runs', 
  BB: 'Walks', 
  SO: 'Strikeouts',
  CS: 'Caught Stealing', 
  IBB: 'Intentional Walks', 
  'GO/AO': 'Ground Outs Per Fly Out', 
  BABIP: 'Average on Balls in Play'
};

const hittingAbbreviationToStatisticDictionary = {
  AB: 'At Bats',
  '2B': 'Doubles',
  '3B': 'Triples',
  RBI: 'Runs Batted In',
  SB: 'Stolen Bases',
  AVG: 'Batting Average',
  OBP: 'On-Base Percentage',
  SLG: 'Slugging Percentage',
  OPS: 'On-Base Plus Slugging',
  PA: 'Plate Appearances',
  HBP: 'Hit By Pitch', 
  SAC: 'Sacrifice Bunts', 
  SF: 'Sacrifice Flys',
  GIDP: 'Ground Into Double Play',
  XBH: 'Extra Base Hits',
  TB: 'Total Bases',
  ISO: 'Isolated Power',
  'AB/HR': 'At Bats per Home Run',
  'BB/K': 'Walk to Strikeout Ratio',
  'BB%': 'Walk Percentage',
  'SO%': 'Strikeout Percentage'
};

const pitchingAbbreviationToStatisticDictionary = {
  W: 'Wins',
  L: 'Losses',
  ERA: 'Earned Run Average',
  GS: 'Games Started',
  CG: 'Complete Games',
  SHO: 'Shutouts',
  SV: 'Saves',
  SVO: 'Save Opportunities',
  IP: 'Innings Pitched',
  ER: 'Earned Runs',
  HB: 'Hit Batsmen',
  WHIP: 'Walks & Hits Per Inning',
  AVG: 'Batting Average Against',
  TBF: 'Total Batters Faced',
  NP: 'Number of Pitches',
  'P/IP': 'Pitches per Inning',
  QS: 'Quality Starts',
  GF: 'Games Finished',
  HLD: 'Holds',
  WP: 'Wild Pitches',
  BK: 'Balks',
  GDP: 'Ground Into Double Play',
  'SO/9': 'Strikeouts per 9 IP',
  'BB/9': 'Walks per 9 IP',
  'K/BB': 'Strikeout to Walk Rate',
  SB: 'Stolen Bases Allowed',
  PK: 'Pickoffs'
};

const statisticTypeToAbbreviationDictionary = {
  hitting: hittingAbbreviationToStatisticDictionary,
  pitching: pitchingAbbreviationToStatisticDictionary
};

@Pipe({
  name: 'statisticKeyToTooltipMessage'
})
export class StatisticKeyToTooltipMessagePipe implements PipeTransform {
  transform(statisticKey: string, statisticType: StatisticType): string {
    const statisticTypeAbbreviationToStatisticName = statisticTypeToAbbreviationDictionary[statisticType];

    return commonAbbreviationToStatisticDictionary[statisticKey] 
      ?? statisticTypeAbbreviationToStatisticName[statisticKey] 
      ?? '';
  }
}
