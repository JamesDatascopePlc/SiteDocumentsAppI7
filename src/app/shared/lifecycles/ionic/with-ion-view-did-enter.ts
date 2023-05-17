import { Subject, map } from "rxjs";
import { ReactiveConstructor } from "../types";

export function withIonViewDidEnter<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _ionViewDidEnter$ = new Subject<void>();
    readonly ionViewDidEnter$ = this._ionViewDidEnter$.pipe.bind(this._ionViewDidEnter$);

    /** Fired when the component routing to has finished animating */
    ionViewDidEnter() {
      this._ionViewDidEnter$.next();
      this._ionViewDidEnter$.complete();
    }

    viewDidEnter<T>(project: () => T) {
      return this._ionViewDidEnter$.pipe(map(project));
    }
  }
}