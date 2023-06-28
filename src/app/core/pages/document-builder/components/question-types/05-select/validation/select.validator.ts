import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { RxValidator } from "src/app/shared/validation";

export class SelectValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("OptionVal")
      .notNull()
      .when(q => q.Required);

      this.ruleFor("AnswerText")
        .notNull()
        .notEmpty()
        .when(q => q.OptionVal === '-1' && q.Required);
  }
}

export function useSelectValidator(value: Func<Question>) {
  return new RxValidator(new SelectValidator(), value);
}
