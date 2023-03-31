import { pipe, tap } from "rxjs";

export function actionPipe<T>(action: (value: T) => void) {
  return () => pipe(
    tap(action)
  );
}