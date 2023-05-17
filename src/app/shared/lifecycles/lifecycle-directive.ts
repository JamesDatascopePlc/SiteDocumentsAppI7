import { Directive } from "@angular/core";
import { flow } from "lodash-es";
import { withNoop } from "./with-noop";
import { AnyFunction } from "./types";

@Directive()
class ReactiveDirective {}

export function AngularDirective<T1 extends AnyFunction>(h1: T1): ReturnType<T1>
export function AngularDirective<T1 extends AnyFunction, T2 extends AnyFunction>(h1: T1, h2: T2): ReturnType<T1> & ReturnType<T2>
export function AngularDirective<T1 extends AnyFunction, T2 extends AnyFunction, T3 extends AnyFunction>(h1: T1, h2: T2, h3: T3): ReturnType<T1> & ReturnType<T2> & ReturnType<T3>
export function AngularDirective<T1 extends AnyFunction, T2 extends AnyFunction, T3 extends AnyFunction, T4 extends AnyFunction>(h1: T1, h2: T2, h3: T3, h4: T4): ReturnType<T1> & ReturnType<T2> & ReturnType<T3> & ReturnType<T4>
export function AngularDirective<T1 extends AnyFunction, T2 extends AnyFunction, T3 extends AnyFunction, T4 extends AnyFunction, T5 extends AnyFunction>(h1: T1, h2: T2, h3: T3, h4: T4, h5: T5): ReturnType<T1> & ReturnType<T2> & ReturnType<T3> & ReturnType<T4> & ReturnType<T5>
export function AngularDirective<T1 extends AnyFunction, T2 extends AnyFunction, T3 extends AnyFunction, T4 extends AnyFunction, T5 extends AnyFunction, T6 extends AnyFunction>(h1: T1, h2: T2, h3: T3, h4: T4, h5: T5, h6: T6): ReturnType<T1> & ReturnType<T2> & ReturnType<T3> & ReturnType<T4> & ReturnType<T5> & ReturnType<T6>
export function AngularDirective(): ReturnType<typeof withNoop> & ReactiveDirective;
export function AngularDirective(...args: AnyFunction[]): any {
  if (args == null || args.length === 0) return ReactiveDirective;
  
  const withHooks = flow(args);
  return withHooks(ReactiveDirective);
}