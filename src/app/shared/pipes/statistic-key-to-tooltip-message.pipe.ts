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

    return commonAbbreviationToStatisticDictionary[statisticKey] ?? '';
  }
}
