import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { RxValidator } from "src/app/shared/validation";

export class CheckboxTextboxValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("YesNoNA")
      .equal(true)
      .when(q => q.Required);

    this.ruleFor("AnswerText")
      .notNull()
      .notEmpty()
      .when(q => q.Required);
  }
}

export function useCheckboxTextboxValidator(value: Func<Question>) {
  return new RxValidator(new CheckboxTextboxValidator(), value)
}