import { Subject, map } from "rxjs";
import { ReactiveConstructor } from "../types";

export function withOnInit<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _init$ = new Subject<void>();
    readonly init$ = this._init$.pipe.bind(this._init$);

    ngOnInit() {
      this._init$.next();
      this._init$.complete();
    }

    onInit<T>(project: () => T) {
      return this._init$.pipe(
        map(project)
      )
    }
  }
}