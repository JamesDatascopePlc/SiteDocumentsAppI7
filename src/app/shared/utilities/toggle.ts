import { BehaviorSubject, Observable, map, shareReplay } from "rxjs";

export class Toggle<T> {
  value: BehaviorSubject<T>;

  constructor(protected value1: T, protected value2: T) {
    this.value = new BehaviorSubject(value1);
  }

  toggle(): Toggle<T> {
    this.value.update(val => val !== this.value1 ? this.value1 : this.value2);
    return this;
  }

  is(value: T): Observable<boolean> {
    return this.value.pipe(
      map(val => val === value),
      shareReplay()
    );
  }

  isNot(value: T): Observable<boolean> {
    return this.value.pipe(
      map(val => val !== value),
      shareReplay()
    );
  }
}