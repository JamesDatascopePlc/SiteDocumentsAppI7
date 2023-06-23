import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";

export class TextboxValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("AnswerText")
      .notEmpty()
      .notNull()
      .when(q => q.Required);
  }
}
