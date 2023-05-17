import { Subject, map } from "rxjs";
import { ReactiveConstructor } from "../types";

export function withIonViewWillEnter<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _ionViewWillEnter$ = new Subject<void>();
    readonly ionViewWillEnter$ = this._ionViewWillEnter$.pipe.bind(this._ionViewWillEnter$);

    /** Fired when the component routing to is about to animate into view */
    ionViewWillEnter() {
      this._ionViewWillEnter$.next();
    }

    viewWillEnter<T>(project: () => T) {
      return this._ionViewWillEnter$.pipe(map(project));
    }
  }
}