import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";

export class CheckboxValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("YesNoNA")
      .equal(true)
      .when(q => q.Required)
  }
}

export function useCheckboxValidator(value: Func<Question>) {
  const validator = new CheckboxValidator();

  return {
    validate: () => validator.validate(value())
  }
}