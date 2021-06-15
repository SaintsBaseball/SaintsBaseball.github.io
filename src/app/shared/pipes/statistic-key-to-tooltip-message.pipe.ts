import { Pipe, PipeTransform } from '@angular/core';
import { commonAbbreviationToStatisticDictionary, statisticTypeToAbbreviationDictionary } from 'src/app/constants/statistic-abbreviation-to-statistic-name-dictionary';
import { StatisticType } from 'src/app/types/statistic-type';

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
