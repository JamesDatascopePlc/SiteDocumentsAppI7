import { ReactiveConstructor } from "../types";
import { use } from "../../rxjs";

export function withOnInit<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    readonly init = use();

    ngOnInit() {
      this.init.next();
      this.init.complete();
    }
  }
}