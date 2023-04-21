import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Question, Section } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";

@Component({
  selector: "linked-bool-question[question][section]",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="ion-no-margin" slot="end"></camera-capture>
        <file-upload *rxIf="question.CanHaveFiles" class="ion-no-margin" slot="end"></file-upload>
      </ion-item>

      <ion-item lines="none">
        <ion-label>{{ section.TableTitles[1] }}</ion-label>
        <ion-checkbox [(ngModel)]="question.YesNoNA" slot="end"></ion-checkbox>
      </ion-item>

      <ion-item>
        <ion-label>{{ section.TableTitles[2] }}</ion-label>
        <ion-checkbox [disabled]="!question.YesNoNA" slot="end"></ion-checkbox>
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
export class LinkedBoolComponent {
  @Input()
  question!: Question;

  @Input()
  section!: Section;
}
