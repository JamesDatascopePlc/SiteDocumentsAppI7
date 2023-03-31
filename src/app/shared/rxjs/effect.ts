import { Observable, Subject } from "rxjs";

export function effect<TInput, TResult = unknown>(action: ($: Observable<TInput>) => Observable<TResult>) {
  const subject = new Subject<TInput>();

  return {
    next: (value: TInput) => subject.next(value),
    effect: action(subject)
  }
}