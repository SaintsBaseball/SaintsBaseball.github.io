import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statisticKeyToTooltipMessage'
})
export class StatisticKeyToTooltipMessagePipe implements PipeTransform {
  transform(statisticKey: string): string {
    return null;
  }
}
