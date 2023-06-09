import { Pipe, PipeTransform } from '@angular/core';
import { mapValues } from 'lodash-es';

@Pipe({
  name: 'toStringValues',
  standalone: true
})
export class ToStringValuesPipe implements PipeTransform {

  transform<T extends object>(values: T[]) {
    return values.map(obj => mapValues(obj, val => val + ""));
  }

}
