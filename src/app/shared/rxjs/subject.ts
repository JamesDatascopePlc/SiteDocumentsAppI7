import { ReplaySubject, Subject } from "rxjs";

export type SubjectOf<T> = Subject<T>["pipe"] & { next: Subject<T>["next"] }
export type ReplaySubjectOf<T> = ReplaySubject<T>["pipe"] & { next: ReplaySubject<T>["next"] }

export function subject<T = void>(): SubjectOf<T> {
  const s = new Subject<T>();

  return Object.assign(s.pipe.bind(s), {
    next: s.next.bind(s)
  })
}

export function replaySubject<T = void>(bufferSize = 1): ReplaySubjectOf<T> {
  const s = new ReplaySubject<T>(bufferSize);

  return Object.assign(s.pipe.bind(s), {
    next: s.next.bind(s)
  })
}