import { Pipe, PipeTransform } from "@angular/core";
import Fuse from 'fuse.js'
import { Observable, map } from "rxjs";

export interface FuseOptions<T> extends Omit<Fuse.IFuseOptions<T>, "keys"> {
  search: string,
  keys?: keyof T | Array<keyof T>
}

@Pipe({
  name: "fuse",
  standalone: true
})
export class FusePipe implements PipeTransform {
  transform<T>(values: Observable<T[]>, options: FuseOptions<T>): Observable<T[]>
  transform<T>(values: T[], options: FuseOptions<T>): T[] 
  transform<T>(values: Observable<T[]> | T[], options: FuseOptions<T>): Observable<T[]> | T[] {
    if (options.search == null || options.search.length === 0)
      return values;
    
    return values instanceof Observable<T[]>
      ? values.pipe(
        map(vals => new Fuse(vals, { 
          threshold: .1,
          ignoreLocation: true,
          ...options as Fuse.IFuseOptions<T>
        })
        .search(options.search)
        .map(val => val.item))
      )
      : new Fuse(values, { 
          threshold: .1,
          ignoreLocation: true,
          ...options as Fuse.IFuseOptions<T>
        })
        .search(options.search)
        .map(val => val.item);
  }
}
