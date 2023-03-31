import { Subject } from "rxjs";
import { ReactiveConstructor } from "../lifecycle-component";

export function withOnInit<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _init$ = new Subject<void>();
    readonly init$ = this._init$.asObservable();

    ngOnInit() {
      this._init$.next();
      this._init$.complete();
    }
  }
}