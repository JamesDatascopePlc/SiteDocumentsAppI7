import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { SelectableComponent } from "src/app/shared/components";
import { Question } from "src/app/core/stores/site-document/models";
import { useAssetInspectionSchedules } from "src/app/core/http/asset.api";
import { useSelectValidator } from "../05-select/validation/select.validator";

@Component({
  selector: "asset-inspection-schedules-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="m-0" slot="end" />
        <file-upload *rxIf="question.CanHaveFiles" class="m-0" slot="end" />
      </ion-item>

      <selectable
        placeholder="Select"
        [title]="question.QuestionText"
        [items]="schedules.options() | push"
        itemValue="ScheduleId"
        itemText="ScheduleName"
        [(value)]="question.OptionVal"
        (itemChange)="question.SelectedOptionText = $event?.ScheduleName"
        [canClear]="!question.Required" />
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    QuestionTextComponent,
    SelectableComponent,
    CameraCaptureComponent,
    FileUploadComponent
  ]
})
export class AssetInspectionSchedulesComponent {
  @Input({ required: true })
  question!: Question;

  validator = useSelectValidator(() => this.question);

  schedules = useAssetInspectionSchedules();
}
