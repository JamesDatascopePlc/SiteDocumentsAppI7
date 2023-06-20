import { CheckboxSummaryComponent } from "./01-checkbox/summary/checkbox-summary.component";
import { RadioGroupSummaryComponent } from "./02-radio-group/summary/radio-group-summary.component";
import { TextboxSummaryComponent } from "./03-textbox/summary/textbox-summary.component";
import { SelectSummaryComponent } from "./05-select/summary/select-summary.component";
import { CheckboxTextboxSummaryComponent } from "./06-checkbox-textbox/summary/checkbox-textbox-summary.component";
import { RadioGroupTextboxSummaryComponent } from "./07-radio-group-textbox/summary/radio-group-textbox-summary.component";
import { DateSummaryComponent } from "./08-date/summary/date-summary.component";
import { DatetimeSummaryComponent } from "./09-datetime/summary/datetime-summary.component";
import { NumberSummaryComponent } from "./12-number/summary/number-summary.component";
import { LinkedDatesSummaryComponent } from "./18-linked-dates/summary/linked-dates-summary.component";
import { SignatureSummaryComponent } from "./19-signature/summary/signature-summary.component";

export function importQuestionSummaries() {
  return [
    CheckboxSummaryComponent,
    RadioGroupSummaryComponent,
    TextboxSummaryComponent,
    SelectSummaryComponent,
    RadioGroupSummaryComponent,
    CheckboxTextboxSummaryComponent,
    RadioGroupTextboxSummaryComponent,
    DateSummaryComponent,
    DatetimeSummaryComponent,
    NumberSummaryComponent,
    LinkedDatesSummaryComponent,
    SignatureSummaryComponent
  ]
}