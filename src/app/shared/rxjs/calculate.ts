import { Observable, OperatorFunction, map, merge } from "rxjs";

export function calculate<T>(deps: Observable<unknown>[], fn: () => T): Observable<T> 
export function calculate<T, A>(deps: Observable<unknown>[], op1: OperatorFunction<T, A>): Observable<A> 
export function calculate<T, A, B>(deps: Observable<unknown>[], op1: OperatorFunction<T, A>, op2: OperatorFunction<T, B>): Observable<B> 
export function calculate<T, A, B, C>(deps: Observable<unknown>[], op1: OperatorFunction<T, A>, op2: OperatorFunction<T, B>, op3: OperatorFunction<T, C>): Observable<C> 
export function calculate<T, A, B, C, D>(deps: Observable<unknown>[], op1: OperatorFunction<T, A>, op2: OperatorFunction<T, B>, op3: OperatorFunction<T, C>, op4: OperatorFunction<T, D>): Observable<D> 
export function calculate<T>(deps: Observable<unknown>[], ...args: any[]): Observable<any> {
  const merger = merge(...deps);
  
  if (typeof args[0] === "function") {
    const fn: () => T = args[0];
    return merger.pipe(map(fn));
  }

  return merger.pipe.apply(merger, args as any);
}