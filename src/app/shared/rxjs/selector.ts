import { map, Observable } from "rxjs";

export function selector<TInput>(observable: Observable<TInput>) {
  return <TResult>(mapFn: (value: TInput) => TResult) => observable.pipe(
    map(mapFn)
  );
}
