import { Observable, Subject, debounceTime } from "rxjs";

export function clickReaction<TParam = void, TResult = unknown>(reaction: (click$: Observable<TParam>) => Observable<TResult>) {
  const $ = new Subject<TParam>();
  
  reaction($.pipe(debounceTime(300)))
    .subscribe();

  return $.next.bind($);
}