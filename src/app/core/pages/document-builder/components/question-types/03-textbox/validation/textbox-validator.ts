import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { RxValidator } from "src/app/shared/validation";

export class TextboxValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("AnswerText")
      .notEmpty()
      .notNull()
      .when(q => q.Required);
  }
}

export function useTextboxValidator(value: Func<Question>) {
  return new RxValidator(new TextboxValidator(), value);
}