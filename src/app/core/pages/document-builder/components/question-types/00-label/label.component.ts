import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { useLabelValidator } from "./validation/label.validator";

@Component({
  selector: 'label-question',
  template: `
    <ion-item lines="none">
      <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
      <camera-capture *rxIf="question.CanHaveImg" [(img)]="question.Img" class="m-0" slot="end" />
      <file-upload *rxIf="question.CanHaveFiles" [(dataUrl)]="question.File" class="m-0" slot="end" />
    </ion-item>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    QuestionTextComponent,
    CameraCaptureComponent,
    FileUploadComponent
  ]
})
export class LabelComponent {
  @Input({ required: true })
  question!: Question;

  validator = useLabelValidator(() => this.question);
}