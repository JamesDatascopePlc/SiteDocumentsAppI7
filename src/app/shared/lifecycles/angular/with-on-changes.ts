import { SimpleChanges } from "@angular/core";
import { filter, map, merge, Observable, Subject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ReactiveConstructor } from "../types";

export function withOnChanges<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    private _onChanges$ = new Subject<SimpleChanges>();
    readonly changes$ = this._onChanges$.pipe(
      takeUntilDestroyed()
    );

    ngOnChanges(changes: SimpleChanges) {
      this._onChanges$.next(changes);
    }

    input$<P extends keyof this & string>(property: P): Observable<this[P]> {
      return this.changes$.pipe(
        map(changes => changes[property]),
        filter(change => change !== undefined),
        map(change => change!.currentValue)
      );
    }

    inputs$<P extends keyof this & string>(...properties: P[]) {
      return merge(...properties.map(p => this.input$(p)));
    }
  }
}