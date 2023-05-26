import { BehaviorSubject, Observable, OperatorFunction, ReplaySubject, map } from "rxjs";

export function use<T = void>(initialState?: T) {
  const s = initialState != null 
    ? new BehaviorSubject<T>(initialState)
    : new ReplaySubject<T>(1);

  function pipeline<R>(fn: (arg: T) => R): Observable<R>;
  function pipeline(): Observable<T>;
  function pipeline<A>(op1: OperatorFunction<T, A>): Observable<A>;
  function pipeline<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B>;
  function pipeline<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): Observable<C>;
  function pipeline<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): Observable<D>;
  function pipeline<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): Observable<E>;
  function pipeline<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): Observable<F>;
  function pipeline<A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): Observable<G>;
  function pipeline<R>(...args: any): any {
    if (typeof args[0] === "function") {
      const fn: (arg: T) => R = args[0];
      return s.pipe(map(fn));
    }

    return s.pipe.apply(s, args);
  }

  return Object.assign(pipeline, {
    next: s.next.bind(s)
  });
}

// import { BehaviorSubject, Observable, OperatorFunction, ReplaySubject, map } from "rxjs";

// function createPipeline<T>(s: Observable<T>) {
//   function pipeline<R>(fn: (arg: T) => R): ReturnType<typeof createPipeline<R>>;
//   function pipeline(): Observable<T>;
//   function pipeline<A>(op1: OperatorFunction<T, A>): Observable<A>;
//   function pipeline<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B>;
//   function pipeline<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): Observable<C>;
//   function pipeline<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): Observable<D>;
//   function pipeline<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): Observable<E>;
//   function pipeline<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): Observable<F>;
//   function pipeline<A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): Observable<G>;
//   function pipeline<R>(...args: any): any {
//     if (args.length === 0) {
//       return s;
//     }
    
//     if (typeof args[0] === "function") {
//       const fn: (arg: T) => R = args[0];
//       return createPipeline(s.pipe(map(fn)));
//     }

//     return s.pipe.apply(s, args);
//   }

//   return pipeline;
// }


// export function use<T = void>(initialState?: T) {
//   const s = initialState != null 
//       ? new BehaviorSubject<T>(initialState)
//       : new ReplaySubject<T>(1);

//   return Object.assign(createPipeline(s), {
//     next: s.next.bind(s),
//     complete: s.complete.bind(s)
//   });
// }