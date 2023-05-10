import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";

@Component({
  selector: "textarea-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">
          {{ question.QuestionText }}
        </question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="ion-no-margin" slot="end" />
        <file-upload *rxIf="question.CanHaveFiles" class="ion-no-margin" slot="end" />
      </ion-item>
      <ion-item>
        <ion-textarea label="" rows="6" fill="outline" />
      </ion-item>
    </ion-list>
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
export class TextareaComponent {
  @Input({ required: true })
  question!: Question;
}
