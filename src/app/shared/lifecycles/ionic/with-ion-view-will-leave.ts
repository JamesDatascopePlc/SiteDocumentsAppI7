import { Subject, map } from "rxjs";
import { ReactiveConstructor } from "../types";

export function withIonViewWillLeave<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _ionViewWillLeave$ = new Subject<void>();
    readonly ionViewWillLeave$ = this._ionViewWillLeave$.pipe.bind(this._ionViewWillLeave$);

    /** Fired when the component routing to is about to animate into view */
    ionViewWillLeave() {
      this._ionViewWillLeave$.next();
      this._ionViewWillLeave$.complete();
    }

    viewWillLeave<T>(project: () => T) {
      return this._ionViewWillLeave$.pipe(map(project));
    }
  }
}