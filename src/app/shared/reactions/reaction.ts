import { Observable, Subject } from "rxjs";

export function reaction<TParam = void, TResult = unknown>(fn: ($: Observable<TParam>) => Observable<TResult>) {
  const $ = new Subject<TParam>();

  fn($).subscribe();

  return $.next.bind($);
}