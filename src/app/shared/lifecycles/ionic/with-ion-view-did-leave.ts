import { ReactiveConstructor } from "../types";
import { use } from "../../rxjs";

export function withIonViewDidLeave<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    readonly viewWillLeave = use();

    /** Fired when the component routing to has finished animating */
    ionViewWillLeave() {
      this.viewWillLeave.next();
      this.viewWillLeave.complete();
    }
  }
}