import { Subject } from "rxjs";
import { ReactiveConstructor } from "../lifecycle-component";

export function withIonViewDidEnter<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _ionViewDidEnter$ = new Subject<void>();
    readonly ionViewDidEnter$ = this._ionViewDidEnter$.asObservable();

    /** Fired when the component routing to has finished animating */
    ionViewDidEnter() {
      this._ionViewDidEnter$.next();
      this._ionViewDidEnter$.complete();
    }
  }
}