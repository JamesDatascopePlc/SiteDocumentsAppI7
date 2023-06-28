import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { RxValidator } from "src/app/shared/validation";

export class SelectTextValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("OptionVal")
      .notNull()
      .notEmpty()
      .when(q => q.Required);

    this.ruleFor("AnswerText")
      .notNull()
      .notEmpty()
      .when(q => q.OptionVal === '-1');

    this.ruleFor("MoreAdditionalText")
      .notNull()
      .notEmpty()
      .when(q => q.Required);
  }
}

export function useSelectTextValidator(value: Func<Question>) {
  return new RxValidator(new SelectTextValidator(), value);
}