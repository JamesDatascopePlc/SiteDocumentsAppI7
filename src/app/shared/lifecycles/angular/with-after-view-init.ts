import { Subject, map } from "rxjs";
import { ReactiveConstructor } from "../types";

export function withAfterViewInit<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _afterViewInit$ = new Subject<void>();
    readonly afterViewInit$ = this._afterViewInit$.pipe.bind(this._afterViewInit$);

    ngAfterViewInit() {
      this._afterViewInit$.next();
      this._afterViewInit$.complete();
    }

    afterViewInit<T>(project: () => T) {
      return this._afterViewInit$.pipe(
        map(project)
      );
    }
  }
}