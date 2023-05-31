import { ReactiveConstructor } from "../types";
import { use } from "../../rxjs";

export function withAfterViewInit<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    readonly afterViewInit = use();

    ngAfterViewInit() {
      this.afterViewInit.next();
      this.afterViewInit.complete();
    }
  }
}