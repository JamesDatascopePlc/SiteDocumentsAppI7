import { ReactiveConstructor } from "./types";

export function withNoop<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {}
}