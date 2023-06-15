import { Pipe, PipeTransform } from '@angular/core';
import { isMatch } from 'lodash-es';

@Pipe({
  name: 'filterOut',
  standalone: true
})
export class FilterOutPipe implements PipeTransform {
  transform<T extends object>(values: T[], predicate: Partial<T>): T[] {
    return values.filter(val => !isMatch(val, predicate));
  }
}
