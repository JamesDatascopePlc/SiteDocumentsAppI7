import { Subject } from "rxjs";

export type SubjectOf<T> = Subject<T>["pipe"] & { next: Subject<T>["next"] }

export function subject<T = void>(): SubjectOf<T> {
  const s = new Subject<T>();

  return Object.assign(s.pipe.bind(s), {
    next: s.next.bind(s)
  })
}

