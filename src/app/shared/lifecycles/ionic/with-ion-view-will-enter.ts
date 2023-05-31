import { ReactiveConstructor } from "../types";
import { use } from "../../rxjs";

export function withIonViewWillEnter<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    readonly viewWillEnter = use();

    /** Fired when the component routing to is about to animate into view */
    ionViewWillEnter() {
      this.viewWillEnter.next();
    }
  }
}