import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "checkbox-question-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-checkbox [(ngModel)]="question.YesNoNA" aria-label="" slot="start"></ion-checkbox>
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="m-0" slot="end" />
        <file-upload *rxIf="question.CanHaveFiles" class="m-0" slot="end" />
      </ion-item>

      <ion-textarea class="p-2" [(ngModel)]="question.AnswerText" label="text:" labelPlacement="stacked" rows="3" fill="outline" />
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    FormsModule,
    QuestionTextComponent,
    CameraCaptureComponent,
    FileUploadComponent,
  ]
})
export class CheckboxTextboxComponent {
  @Input({ required: true })
  question!: Question;
}