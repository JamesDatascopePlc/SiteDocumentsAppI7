import { pipe, tap } from "rxjs";

export function pipeTap<T>(action: (value: T) => void) {
  return () => pipe(
    tap(action)
  );
}