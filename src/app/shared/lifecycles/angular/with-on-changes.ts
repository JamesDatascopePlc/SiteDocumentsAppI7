import { SimpleChanges } from "@angular/core";
import { filter, map, merge } from "rxjs";
import { ReactiveConstructor } from "../types";
import { use } from "../../rxjs";

export function withOnChanges<TBase extends ReactiveConstructor>(Base: TBase) {
  return class extends Base {
    readonly changes = use<SimpleChanges>();

    ngOnChanges(changes: SimpleChanges) {
      this.changes.next(changes);
    }

    input<P extends keyof this & string>(property: P) {
      return this.changes(
        map(changes => changes[property]),
        filter(change => change !== undefined),
        map(change => change!.currentValue as this[P])
      )();
    }

    inputs<P extends keyof this & string>(...properties: P[]) {
      return merge(...properties.map(p => this.input(p)));
    }
  }
}