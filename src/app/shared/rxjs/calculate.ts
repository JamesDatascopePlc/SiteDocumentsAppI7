import { Observable, map } from "rxjs";
import { createPipe } from "./use";

export interface CalculateOptions<T, R> {
  value: Func<T>,
  when: Observable<R>
}

export function calculate<T, R>({ value, when }: CalculateOptions<T, R>) {
  return createPipe(when.pipe(
    map(() => value())
  ));
}