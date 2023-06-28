import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { RxValidator } from "src/app/shared/validation";

export class AssetListValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("Assets")
      .notNull()
      .must(items => items.length > 0)
      .when(q => q.Required);

    this.ruleFor("Assets")
      .must((operatives, question) => {
        const min = question.ValidationData
          .find(v => v.Key === "Min")!
          .Value
          .toNumber();

        return operatives.length >= min;
      })
      .when(q => q.ValidationData.some(v => v.Key === "Min"));

      this.ruleFor("Assets")
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

export function useAssetListValidator(value: Func<Question>) {
  return new RxValidator(new AssetListValidator(), value);
}