import { computed, signal } from "@angular/core";
import { ValidationErrors, Validator } from "fluentvalidation-ts";

export class SignalValidator<T extends Validator<TModel>, TModel> {
  constructor(
    protected validator: T,
    protected value: Func<TModel>
  ) {}

  readonly errors = signal<ValidationErrors<TModel>>({});
  readonly isInvalid = computed(() => Object.keys(this.errors()).length > 0);
  readonly isValid = computed(() => !this.isInvalid());

  validate() {
    this.errors.set(this.validator.validate(this.value()));

    return this;
  }
}

export function useValidator<T extends Validator<TModel>, TModel>({ validator, value }: { validator: T, value: () => TModel }) {
  return new SignalValidator<T, TModel>(validator, value);
}