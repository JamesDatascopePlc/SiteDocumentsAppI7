import { BehaviorSubject, Observable, OperatorFunction, ReplaySubject, lastValueFrom, map } from "rxjs";

export type UsePipe<T> = ReturnType<typeof createPipe<T>>;

export function createPipe<T>(s: Observable<T>) {
  function pipe<R>(fn: (arg: T) => R): UsePipe<R>;
  function pipe(): Observable<T>;
  function pipe<A>(op1: OperatorFunction<T, A>): UsePipe<A>;
  function pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): UsePipe<B>;
  function pipe<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): UsePipe<C>;
  function pipe<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): UsePipe<D>;
  function pipe<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): UsePipe<E>;
  function pipe<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): UsePipe<F>;
  function pipe<A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): UsePipe<G>;
  function pipe<R>(...args: any): any {
    if (args.length === 0) {
      return s;
    }
    
    if (typeof args[0] === "function") {
      const fn: (arg: T) => R = args[0];
      return createPipe(s.pipe(map(fn)));
    }

    return createPipe(s.pipe.apply(s, args));
  }

  return pipe;
}

export type UseOf<T> = ReturnType<typeof use<T>>;

export function use<T = void>(initialState?: T) {
  const s = initialState != null 
      ? new BehaviorSubject<T>(initialState)
      : new ReplaySubject<T>(1);

  return Object.assign(createPipe(s), {
    next: s.next.bind(s),
    complete: s.complete.bind(s),
    mutate: async (mutation: (value: T) => T) => {
      const value = await lastValueFrom(s);
      const update = mutation(value);

      s.next(update);
    } 
  });
}