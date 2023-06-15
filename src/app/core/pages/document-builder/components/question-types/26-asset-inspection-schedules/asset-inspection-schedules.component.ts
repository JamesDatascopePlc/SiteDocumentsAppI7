import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { SelectableComponent } from "src/app/shared/components";
import { Question } from "src/app/core/stores/site-document/models";
import { useAssetInspectionSchedules } from "src/app/core/http/asset.api";

@Component({
  selector: "asset-inspection-schedules-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="ion-no-margin" slot="end" />
        <file-upload *rxIf="question.CanHaveFiles" class="ion-no-margin" slot="end" />
      </ion-item>

      <selectable
        placeholder="Select"
        [title]="question.QuestionText"
        [items]="schedules.data() | push"
        itemValue="ScheduleID"
        itemText="ScheduleName"
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

  schedules = useAssetInspectionSchedules();
}
