import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { RxValidator } from "src/app/shared/validation";

export class LabelValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("File")
      .notNull()
      .when(q => q.Required && q.CanHaveFiles);

    this.ruleFor("Img")
      .notNull()
      .when(q => q.Required && q.CanHaveImg || q.CanUsePhotoLib);
  }
}

export function useLabelValidator(value: Func<Question>) {
  return new RxValidator(new LabelValidator(), value);
}