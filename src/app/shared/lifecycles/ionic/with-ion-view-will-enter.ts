import { Subject } from "rxjs";
import { ReactiveConstructor } from "../lifecycle-component";

export function withIonViewWillEnter<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _ionViewWillEnter$ = new Subject<void>();
    readonly ionViewWillEnter$ = this._ionViewWillEnter$.asObservable();

    /** Fired when the component routing to is about to animate into view */
    ionViewWillEnter() {
      this._ionViewWillEnter$.next();
    }
  }
}