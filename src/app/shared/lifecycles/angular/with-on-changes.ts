import { SimpleChanges } from "@angular/core";
import { Observable, Subject, filter, map, merge } from "rxjs";
import { ReactiveConstructor } from "../types";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";


export function withOnChanges<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _onChanges$ = new Subject<SimpleChanges>();
    readonly changes$ = this._onChanges$.asObservable();

    ngOnChanges(changes: SimpleChanges) {
      this._onChanges$.next(changes);
    }

    input<P extends keyof this & string>(property: P): Observable<this[P]> {
      return this.changes$.pipe(
        takeUntilDestroyed(),
        map(changes => changes[property]),
        filter(change => change !== undefined),
        map(change => change!.currentValue)
      );
    }

    inputs<P extends keyof this & string>(...properties: P[]) {
      return merge(...properties.map(p => this.input(p)));
    }
  }
}