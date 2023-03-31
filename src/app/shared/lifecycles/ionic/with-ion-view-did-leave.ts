import { Subject } from "rxjs";
import { ReactiveConstructor } from "../lifecycle-component";

export function withIonViewDidLeave<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _ionViewDidLeave$ = new Subject<void>();
    readonly ionViewDidLeave$ = this._ionViewDidLeave$.asObservable();

    /** Fired when the component routing to has finished animating */
    ionViewWillLeave() {
      this._ionViewDidLeave$.next();
      this._ionViewDidLeave$.complete();
    }
  }
}