import { Pipe, PipeTransform } from "@angular/core";
import Fuse from 'fuse.js'

export interface FuseOptions<T> extends Omit<Fuse.IFuseOptions<T>, "keys"> {
  search: string,
  keys?: keyof T | Array<keyof T>
}

@Pipe({
  name: "fuse",
  standalone: true
})
export class FusePipe implements PipeTransform {
  transform<T>(values: T[], options: FuseOptions<T>) {
    if (options.search == null || options.search.length === 0)
      return values;

    return new Fuse(values, { 
      threshold: .1,
      ignoreLocation: true,
      ...options as Fuse.IFuseOptions<T>
    })
    .search(options.search)
    .map(val => val.item);
  }
}
