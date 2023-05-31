import { ReactiveConstructor } from "../types";
import { use } from "../../rxjs";

export function withIonViewDidEnter<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    readonly viewDidEnter = use();

    /** Fired when the component routing to has finished animating */
    ionViewDidEnter() {
      this.viewDidEnter.next();
      this.viewDidEnter.complete();
    }
  }
}