import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { RxValidator } from "src/app/shared/validation";

export class OperativeListValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("Operatives")
      .notNull()
      .must(items => items.length > 0)
      .when(q => q.Required);

    this.ruleFor("Operatives")
      .must((operatives, question) => {
        const min = question.ValidationData
          .find(v => v.Key === "Min")!
          .Value
          .toNumber();

        return operatives.length >= min;
      })
      .when(q => q.ValidationData.some(v => v.Key === "Min"));

      this.ruleFor("Operatives")
        .must((operatives, question) => {
          const max = question.ValidationData
            .find(v => v.Key === "Max")!
            .Value
            .toNumber();

          return operatives.length <= max;
        })
        .when(q => q.ValidationData.some(v => v.Key === "Max"));
  }
}

export function useOperativeValidator(value: Func<Question>) {
  return new RxValidator(new OperativeListValidator(), value);
}