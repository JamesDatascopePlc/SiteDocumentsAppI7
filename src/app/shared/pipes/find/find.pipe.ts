import { Pipe, PipeTransform } from '@angular/core';
import { find } from 'lodash-es';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'find',
  standalone: true
})
export class FindPipe implements PipeTransform {

  transform<T>(value: Observable<T[]>, predicate: Partial<T>) {
    return value.pipe(
      map(vals => find(vals, predicate) as T)
    );
  }

}
