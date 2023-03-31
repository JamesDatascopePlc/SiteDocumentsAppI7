import { Subject } from "rxjs";
import { ReactiveConstructor } from "../lifecycle-component";

export function withIonViewWillLeave<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _ionViewWillLeave$ = new Subject<void>();
    readonly ionViewWillLeave$ = this._ionViewWillLeave$.asObservable();

    /** Fired when the component routing to is about to animate into view */
    ionViewWillLeave() {
      this._ionViewWillLeave$.next();
      this._ionViewWillLeave$.complete();
    }
  }
}