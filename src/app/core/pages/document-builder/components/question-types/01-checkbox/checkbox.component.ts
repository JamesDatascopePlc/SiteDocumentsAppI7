import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'checkbox-question[question]',
  template: `
    <ion-item lines="none">
      <ion-checkbox [(ngModel)]="question.YesNoNA" aria-label="" slot="start"></ion-checkbox>
      <question-text [required]="question.Required">
        {{ question.QuestionText }}
      </question-text>
      <camera-capture *rxIf="question.CanHaveImg" class="ion-no-margin" slot="end"></camera-capture>
      <file-upload *rxIf="question.CanHaveFiles" class="ion-no-margin" slot="end"></file-upload>
    </ion-item>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    FormsModule,
    ...importRxTemplate(),
    QuestionTextComponent,
    CameraCaptureComponent,
    FileUploadComponent
  ]
})
export class CheckboxComponent {
  @Input()
  question!: Question;
}
