import { LabelSummaryComponent } from "./00-label/summary/label-summary.component";
import { CheckboxSummaryComponent } from "./01-checkbox/summary/checkbox-summary.component";
import { RadioGroupSummaryComponent } from "./02-radio-group/summary/radio-group-summary.component";
import { TextboxSummaryComponent } from "./03-textbox/summary/textbox-summary.component";
import { SelectSummaryComponent } from "./05-select/summary/select-summary.component";
import { CheckboxTextboxSummaryComponent } from "./06-checkbox-textbox/summary/checkbox-textbox-summary.component";
import { RadioGroupTextboxSummaryComponent } from "./07-radio-group-textbox/summary/radio-group-textbox-summary.component";
import { DateSummaryComponent } from "./08-date/summary/date-summary.component";
import { DatetimeSummaryComponent } from "./09-datetime/summary/datetime-summary.component";
import { OperativeListSummaryComponent } from "./10-operative-list/summary/operative-list-summary.component";
import { NumberSummaryComponent } from "./12-number/summary/number-summary.component";
import { CascadeSelectSummaryComponent } from "./13-cascade-select/summary/cascade-select-summary.component";
import { LinkedBoolSummaryComponent } from "./16-linked-bool/summary/linked-bool-summary.component";
import { AssetListSummaryComponent } from "./17-asset-list/summary/asset-list-summary.component";
import { LinkedDatesSummaryComponent } from "./18-linked-dates/summary/linked-dates-summary.component";
import { SignatureSummaryComponent } from "./19-signature/summary/signature-summary.component";
import { SelectTextSummaryComponent } from "./29-select-text/summary/select-text-summary.component";
import { CascadeSelectTextSummaryComponent } from "./30-cascade-select-text/summary/cascade-select-text-summary.component";
import { TimeSummaryComponent } from "./32-time/summary/time-summary.component";
import { LinkedTimesSummaryComponent } from "./33-linked-times/summary/linked-times-summary.component";
import { LinkedDateTimeSummaryComponent } from "./36-linked-date-time/summary/linked-date-time-summary.component";

export function importQuestionSummaries() {
  return [
    LabelSummaryComponent,
    CheckboxSummaryComponent,
    RadioGroupSummaryComponent,
    TextboxSummaryComponent,
    SelectSummaryComponent,
    RadioGroupSummaryComponent,
    CheckboxTextboxSummaryComponent,
    RadioGroupTextboxSummaryComponent,
    DateSummaryComponent,
    DatetimeSummaryComponent,
    OperativeListSummaryComponent,
    NumberSummaryComponent,
    CascadeSelectSummaryComponent,
    LinkedBoolSummaryComponent,
    AssetListSummaryComponent,
    LinkedDatesSummaryComponent,
    SignatureSummaryComponent,
    SelectTextSummaryComponent,
    CascadeSelectTextSummaryComponent,
    TimeSummaryComponent,
    LinkedTimesSummaryComponent,
    LinkedDateTimeSummaryComponent
  ]
}