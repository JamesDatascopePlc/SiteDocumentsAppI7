import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { RxValidator } from "src/app/shared/validation";

export class CascadeSelectValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("CascadeOptionVal")
      .notNull()
      .notEmpty()
      .when(q => q.Required);
  }
}

export function useCascadeSelectValidator(value: Func<Question>) {
  return new RxValidator(new CascadeSelectValidator(), value);
}