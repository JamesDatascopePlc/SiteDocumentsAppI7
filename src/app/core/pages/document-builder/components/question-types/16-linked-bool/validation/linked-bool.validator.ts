import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { RxValidator } from "src/app/shared/validation";

export class LinkedBoolValidator extends Validator<Question> {
  constructor() {
    super();
    
    this.ruleFor("NumberVal")
      .notNull()
      .notEqual(0)
      .when(q => q.Required && q.YesNoNA === true);
  }
}

export function useLinkedBoolValidator(value: Func<Question>) {
  return new RxValidator(new LinkedBoolValidator(), value);
}
