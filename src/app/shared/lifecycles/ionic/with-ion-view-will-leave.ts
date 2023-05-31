import { ReactiveConstructor } from "../types";
import { use } from "../../rxjs";

export function withIonViewWillLeave<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    readonly viewWillLeave = use();

    /** Fired when the component routing to is about to animate into view */
    ionViewWillLeave() {
      this.viewWillLeave.next();
      this.viewWillLeave.complete();
    }
  }
}