import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortMapByKeyAlphabeticallyPipe'
})
export class SortMapByKeyAlphabeticallyPipe implements PipeTransform {

  transform(map: Map<string, any>): string[] {
    return [];
  }

}
