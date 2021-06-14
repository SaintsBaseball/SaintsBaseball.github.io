import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statisticKeyToTooltipMessage'
})
export class StatisticKeyToTooltipMessagePipe implements PipeTransform {
  transform(statisticKey: string): string {
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

    return commonAbbreviationToStatisticDictionary[statisticKey] ?? hittingAbbreviationToStatisticDictionary[statisticKey] ?? '';
  }
}
