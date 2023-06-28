import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { RxValidator } from "src/app/shared/validation";

export class SignatureValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("SignatureArray")
      .notNull()
      .when(q => q.Required && !q.Disabled);
  }
}

export function useSignatureValidator(value: Func<Question>) {
  return new RxValidator(new SignatureValidator(), value);
}