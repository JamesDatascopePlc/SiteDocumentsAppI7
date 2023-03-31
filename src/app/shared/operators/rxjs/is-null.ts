import { map, pipe } from "rxjs";

export function isNull<T>() {
  return pipe(
    map<T | null, boolean>(val => val == null)
  );
}