import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";

@Component({
  selector: "radio-table-question",
  template: `
    <ion-row>
      <ion-col class="flex items-center" size="2">
        <ion-label>
          <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        </ion-label>
      </ion-col>
      <ion-radio-group class="contents">
        <ion-col class="flex justify-center items-center" size="1">
          <ion-radio aria-label="" color="success" [value]="true"></ion-radio>
        </ion-col>
        <ion-col class="flex justify-center items-center" size="1">
          <ion-radio aria-label="" color="danger" [value]="false"></ion-radio>
        </ion-col>
        <ion-col class="flex justify-center items-center" size="1">
          <ion-radio aria-label="" [value]="null"></ion-radio>
        </ion-col>
      </ion-radio-group>
      <ion-col size="1">
        <camera-capture *rxIf="question.CanHaveImg" />
        <file-upload *rxIf="question.CanHaveFiles" />
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
  @Input({ required: true })
  question!: Question;
}