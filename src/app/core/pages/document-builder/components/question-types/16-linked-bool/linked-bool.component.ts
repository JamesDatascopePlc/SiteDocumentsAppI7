import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Question, Section } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";

@Component({
  selector: "linked-bool-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="m-0" slot="end" />
        <file-upload *rxIf="question.CanHaveFiles" class="m-0" slot="end" />
      </ion-item>

      <ion-item lines="none">
        <ion-label>{{ section.TableTitles[1] }}</ion-label>
        <ion-checkbox [(ngModel)]="question.YesNoNA" slot="end" />
      </ion-item>

      <ion-item>
        <ion-label>{{ section.TableTitles[2] }}</ion-label>
        <ion-checkbox 
          [ngModel]="question.NumberVal === 1" 
          (ngModelChange)="question.NumberVal = +$event;"
          [disabled]="!question.YesNoNA" 
          slot="end" />
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
  @Input({ required: true })
  question!: Question;

  @Input({ required: true })
  section!: Section;
}
