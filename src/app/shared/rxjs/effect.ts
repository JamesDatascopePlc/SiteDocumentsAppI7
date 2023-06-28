import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Observable } from "rxjs";

export function createEffect(effectFn: () => unknown, on: Observable<unknown>) {
  return on.pipe(takeUntilDestroyed())
  .subscribe(() => effectFn());
}