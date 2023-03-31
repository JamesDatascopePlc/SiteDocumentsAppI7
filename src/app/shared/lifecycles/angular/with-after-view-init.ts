import { Subject } from "rxjs";
import { ReactiveConstructor } from "../lifecycle-component";

export function withAfterViewInit<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _afterViewInit$ = new Subject<void>();
    readonly afterViewInit$ = this._afterViewInit$.asObservable();

    ngAfterViewInit() {
      this._afterViewInit$.next();
      this._afterViewInit$.complete();
    }
  }
}