import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "number-question[question]",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="ion-no-margin" slot="end"></camera-capture>
        <file-upload *rxIf="question.CanHaveFiles" class="ion-no-margin" slot="end"></file-upload>
      </ion-item>

      <ion-item>
        <ion-input label="" type="number" [(ngModel)]="question.NumberVal"></ion-input>
      </ion-item>
    </ion-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    FormsModule,
    QuestionTextComponent,
    CameraCaptureComponent,
    FileUploadComponent
  ]
})
export class NumberComponent {
  @Input()
  question!: Question;
}
