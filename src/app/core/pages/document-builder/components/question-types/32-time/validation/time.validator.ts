import { Validator } from "fluentvalidation-ts";
import { Question } from "src/app/core/stores/site-document/models";
import { maxDate, minDate } from "src/app/core/stores/site-document/models/site-document.model";
import { RxValidator } from "src/app/shared/validation";

export class TimeValidator extends Validator<Question> {
  constructor() {
    super();

    this.ruleFor("DateAndTime")
      .must((dateAndTime, question) => {
        const min = minDate(question)!;

        return dateAndTime?.isEqualOrAfter(min) || true;
      })
      .when(q => q.ValidationData.some(v => v.Key === "Min"));

    this.ruleFor("DateAndTime")
      .must((dateAndTime, question) => {
        const max = maxDate(question)!;

        return dateAndTime?.isEqualOrBefore(max) || true;
      })
      .when(q => q.ValidationData.some(v => v.Key === "Min"));
  }
}

export function useTimeValidiator(value: Func<Question>) {
  return new RxValidator(new TimeValidator(), value);
}