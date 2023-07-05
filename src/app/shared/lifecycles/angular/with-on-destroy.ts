import { ReactiveConstructor } from "../types";
import { use } from "../../rxjs";

export function withOnDestroy<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    readonly destroy = use();

    ngOnDestroy() {
      this.destroy.next();
      this.destroy.complete();
    }
  }
}