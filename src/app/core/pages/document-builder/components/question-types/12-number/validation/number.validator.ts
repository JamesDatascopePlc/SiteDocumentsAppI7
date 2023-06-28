import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { RxValidator } from "src/app/shared/validation";

export class NumberValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("NumberVal")
      .notNull()
      .when(q => q.Required);

    this.ruleFor("NumberVal")
      .must((numberVal, question) => {
        const min = question.ValidationData
          .find(v => v.Key === "Min")!
          .Value
          .toNumber();

        return numberVal != null && numberVal >= min;
      })
      .when(q => q.ValidationData.some(v => v.Key === "Min"));

      this.ruleFor("NumberVal")
        .must((numberVal, question) => {
          const max = question.ValidationData
            .find(v => v.Key === "Max")!
            .Value
            .toNumber();

          return numberVal != null && numberVal <= max;
        })
        .when(q => q.ValidationData.some(v => v.Key === "Max"));
  }
}

export function useNumberValidator(value: Func<Question>) {
  return new RxValidator(new NumberValidator(), value);
}