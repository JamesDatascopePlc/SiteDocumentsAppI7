import { debounceTime, pipe } from "rxjs";

export function clickReaction<T>() {
  return pipe(
    debounceTime<T>(300)
  )
}