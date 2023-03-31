import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/site-document.store";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";

@Component({
  selector: "radio-table-question[question]",
  template: `
    <ion-row>
      <ion-col class="flex items-center" size="2">
        <ion-label>
          <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        </ion-label>
      </ion-col>
      <ion-radio-group class="contents">
        <ion-col class="flex justify-center items-center" size="1">
          <ion-radio color="success" [value]="true"></ion-radio>
        </ion-col>
        <ion-col class="flex justify-center items-center" size="1">
          <ion-radio color="danger" [value]="false"></ion-radio>
        </ion-col>
        <ion-col class="flex justify-center items-center" size="1">
          <ion-radio [value]="null"></ion-radio>
        </ion-col>
      </ion-radio-group>
      <ion-col size="1">
        <camera-capture></camera-capture>
        <file-upload></file-upload>
      </ion-col>
    </ion-row>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    QuestionTextComponent,
    CameraCaptureComponent,
    FileUploadComponent
  ]
})
export class RadioTableComponent {  
  @Input()
  question!: Question;
}
