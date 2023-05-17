import { Subject, map } from "rxjs";
import { ReactiveConstructor } from "../types";

export function withIonViewDidLeave<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _ionViewDidLeave$ = new Subject<void>();
    readonly ionViewDidLeave$ = this._ionViewDidLeave$.pipe.bind(this._ionViewDidLeave$);

    /** Fired when the component routing to has finished animating */
    ionViewWillLeave() {
      this._ionViewDidLeave$.next();
      this._ionViewDidLeave$.complete();
    }

    viewDidEnter<T>(project: () => T) {
      return this._ionViewDidLeave$.pipe(map(project));
    }
  }
}