import { BehaviorSubject, ReplaySubject, lastValueFrom } from "rxjs";

export type UseOf<T> = ReturnType<typeof use<T>>;

export function use<T = void>(initialState?: T) {
  const s = initialState != null 
      ? new BehaviorSubject<T>(initialState)
      : new ReplaySubject<T>(1);

  return Object.assign(s.toPipe(), {
    next: s.next.bind(s),
    complete: s.complete.bind(s),
    update: async (mutation: (value: T) => T) => {
      const value = await lastValueFrom(s);
      const update = mutation(value);

      s.next(update);
    } 
  });
}