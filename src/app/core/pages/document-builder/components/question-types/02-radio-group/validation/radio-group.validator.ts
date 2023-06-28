import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { RxValidator } from "src/app/shared/validation";

export class RadioGroupValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("YesNoNA")
      .notNull()
      .when(q => q.Required);
  }
}

export function useRadioGroupValidator(value: Func<Question>) {
  return new RxValidator(new RadioGroupValidator(), value);
}