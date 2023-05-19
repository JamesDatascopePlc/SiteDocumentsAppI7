import { Observable, Subject } from "rxjs";

export function reaction<TParam = void, TResult = unknown>(fn: ($: Subject<TParam>["pipe"]) => Observable<TResult>) {
  const $ = new Subject<TParam>();

  fn($.pipe.bind($)).subscribe();

  return $.next.bind($);
}