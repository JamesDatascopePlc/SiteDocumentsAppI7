import { ValidationErrors, Validator } from "fluentvalidation-ts";
import { BehaviorSubject, filter, map, pairwise } from "rxjs";

export class RxValidator<T extends Validator<TModel>, TModel> {
  constructor(
    protected validator: T,
    protected value: Func<TModel>
  ) {}

  _errors$ = new BehaviorSubject<ValidationErrors<TModel>>({});
  
  readonly errors$ = this._errors$.asObservable();
  readonly isInvalid$ = this._errors$.pipe(
    map(errors => Object.keys(errors).length > 0),
    pairwise(),
    filter(([prev, curr]) => curr !== prev),
    map(([prev, curr]) => curr)
  );
  readonly isValid$ = this.isInvalid$.pipe(
    map(isInvalid => !isInvalid)
  );

  validate() {
    const errors = this.validator.validate(this.value());
    this._errors$.next(errors);

    return this;
  }
}