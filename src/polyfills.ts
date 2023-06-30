/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes recent versions of Safari, Chrome (including
 * Opera), Edge on the desktop, and iOS and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before `zone.js` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code before importing zone.js.
 * import './zone-flags';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */

import './zone-flags';

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js';  // Included with Angular CLI.


/***************************************************************************************************
 * APPLICATION IMPORTS
 */

import { Observable, ObservableInputTuple, OperatorFunction, Subject, map, merge } from "rxjs";

export type ToPipe<T> = ReturnType<typeof toPipe<T>>;

export function toPipe<T>(s: Observable<T>) {
  function pipe<R>(fn: (arg: T) => R): ToPipe<R>;
  function pipe(): Observable<T>;
  function pipe<A>(op1: OperatorFunction<T, A>): ToPipe<A>;
  function pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): ToPipe<B>;
  function pipe<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): ToPipe<C>;
  function pipe<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): ToPipe<D>;
  function pipe<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): ToPipe<E>;
  function pipe<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): ToPipe<F>;
  function pipe<A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): ToPipe<G>;
  function pipe<R>(...args: any): any {
    if (args.length === 0) {
      return s.pipe();
    }
    
    if (args.length === 1 && !args[0].toString().includes("function (source)")) {
      const fn: (arg: T) => R = args[0];
      return toPipe(s.pipe(map(fn)));
    }

    return toPipe(s.pipe.apply(s, args));
  }

  return pipe;
}


declare module "rxjs" {
  interface Observable<T> {
    toPipe(): ToPipe<T>;
    map<R>(project: (value: T, index: number) => R): Observable<R>;
  }
  interface Subject<T> {
    merge<A extends readonly unknown[]>(...sources: [...ObservableInputTuple<A>]): Observable<A> & { next: Subject<T>["next"] }
  }
}

Observable.prototype.toPipe = function<T>(this: Observable<T>) {
  return toPipe(this);
}

Observable.prototype.map = function<T, R>(this: Observable<T>, project: (value: T, index: number) => R) {
  return this.pipe(map(project))
}

Subject.prototype.merge = function<T, A extends readonly unknown[]>(this: Subject<T>, ...sources: [...ObservableInputTuple<A>]) {
  return Object.assign(merge(this, ...sources), {
    next: this.next.bind(this)
  });
}