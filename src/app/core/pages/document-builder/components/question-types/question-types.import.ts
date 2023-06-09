import { LabelComponent } from "./00-label/label.component";
import { CheckboxComponent } from "./01-checkbox/checkbox.component";
import { RadioGroupComponent } from "./02-radio-group/radio-group.component";
import { RadioTableComponent } from "./02-radio-table/radio-table.component";
import { TextboxComponent } from "./03-textbox/textbox.component";
import { TextareaComponent } from "./04-textarea/textarea.component";
import { SelectComponent } from "./05-select/select.component";
import { CheckboxTextboxComponent } from "./06-checkbox-textbox/checkbox-textbox.component";
import { RadioGroupTextboxComponent } from "./07-radio-group-textbox/radio-group-textbox.component";
import { RadioTableTextboxComponent } from "./07-radio-table-textbox/radio-table-textbox.component";
import { DateComponent } from "./08-date/date.component";
import { DatetimeComponent } from "./09-datetime/datetime.component";
import { OperativeListComponent } from "./10-operative-list/operative-list.component";
import { NumberComponent } from "./12-number/number.component";
import { CascadeSelectComponent } from "./13-cascade-select/cascade-select.component";
import { LinkedBoolComponent } from "./16-linked-bool/linked-bool.component";
import { AssetListComponent } from "./17-asset-list/asset-list.component";
import { LinkedDatesComponent } from "./18-linked-dates/linked-dates.component";
import { SignatureComponent } from "./19-signature/signature.component";
import { CompanySelectComponent } from "./21-company-select/company-select.component";
import { AreaSelectComponent } from "./22-area-select/area-select.component";
import { AssetGroupsAndTypesComponent } from "./25-asset-groups-and-types/asset-groups-and-types.component";
import { RamsSelectComponent } from "./28-rams-select/rams-select.component";
import { SelectTextComponent } from "./29-select-text/select-text.component";
import { TimeComponent } from "./32-time/time.component";
import { LinkedTimesComponent } from "./33-linked-times/linked-times.component";
import { HraSelectComponent } from "./34-hra-select/hra-select.component";
import { LinkedDatetimeComponent } from "./36-linked-date-time/linked-datetime.component";

export function importQuestionTypes() {
  return [
    LabelComponent,
    CheckboxComponent,
    RadioGroupComponent,
    RadioTableComponent,
    TextboxComponent,
    TextareaComponent,
    SelectComponent,
    CheckboxTextboxComponent,
    RadioGroupTextboxComponent,
    RadioTableTextboxComponent,
    DateComponent,
    DatetimeComponent,
    OperativeListComponent,
    NumberComponent,
    CascadeSelectComponent,
    LinkedBoolComponent,
    AssetListComponent,
    LinkedDatesComponent,
    SignatureComponent,
    CompanySelectComponent,
    AreaSelectComponent,
    AssetGroupsAndTypesComponent,
    RamsSelectComponent,
    SelectTextComponent,
    TimeComponent,
    LinkedTimesComponent,
    HraSelectComponent,
    LinkedDatetimeComponent
  ]
}