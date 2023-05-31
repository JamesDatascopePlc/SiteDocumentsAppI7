import { Observable, OperatorFunction, map, merge } from "rxjs";
import { UsePipe, createPipe } from "./use";

type ObservableTuple<T> = {
  [K in keyof T]: Observable<T[K]>;
}

export function calculate<T, R>(deps: Observable<T>[], fn: (arg: T) => R): UsePipe<R>
export function calculate<T, A>(deps: Observable<T>[], op1: OperatorFunction<T, A>): UsePipe<A>
export function calculate<T, A, B>(deps: Observable<T>[], op1: OperatorFunction<T, A>, op2: OperatorFunction<T, B>): UsePipe<B>
export function calculate<T, A, B, C>(deps: Observable<T>[], op1: OperatorFunction<T, A>, op2: OperatorFunction<T, B>, op3: OperatorFunction<T, C>): UsePipe<C>
export function calculate<T, A, B, C, D>(deps: Observable<T>[], op1: OperatorFunction<T, A>, op2: OperatorFunction<T, B>, op3: OperatorFunction<T, C>, op4: OperatorFunction<T, D>): UsePipe<D>
export function calculate<T>(deps: Observable<T>[], ...args: any[]): UsePipe<any> {
  const merged$ = merge(...deps);
  
  if (typeof args[0] === "function") {
    const fn: () => T = args[0];
    return createPipe(merged$.pipe(map(fn)));
  }

  return createPipe(merged$.pipe(...args as []));
}

export function using<A extends readonly unknown[]>(...sources: [...ObservableTuple<A>]) {
  const merged$ = merge(...sources);

  return {
    calculate: createPipe(merged$)
  };
}