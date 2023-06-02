import { ReactiveConstructor } from "../types";

export function withTemplateContextGuard<TContext, TBase extends ReactiveConstructor = ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    static ngTemplateContextGuard(directive: unknown, context: unknown): context is { $implicit: TContext } { return true }
  }
}

export function withGenericTemplateContextGuard<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    static ngTemplateContextGuard<TContext>(directive: unknown, context: unknown): context is { $implicit: TContext } { return true }
  }
}