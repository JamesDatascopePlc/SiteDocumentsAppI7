import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { RxValidator } from "src/app/shared/validation";

export class RadioGroupTextboxValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("YesNoNA")
      .notNull()
      .when(q => q.Required);

    this.ruleFor("AdditionalText")
      .notNull()
      .notEmpty()
      .when(question => question.Required);
  }
}

export function useRadioGroupTextboxValidator(value: Func<Question>) {
  return new RxValidator(new RadioGroupTextboxValidator(), value);
}
