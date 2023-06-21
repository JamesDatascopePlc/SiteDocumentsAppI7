import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { SelectableComponent } from "src/app/shared/components";
import { Question } from "src/app/core/stores/site-document/models";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "cascade-select-text-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="m-0" slot="end" />
        <file-upload *rxIf="question.CanHaveFiles" class="m-0" slot="end" />
      </ion-item>
      <selectable 
        placeholder="Select"
        [title]="question.QuestionText"
        [items]="question.AnswerOptions"
        itemValue="Val"
        itemText="Text"
        [canClear]="!question.Required" />
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.CascadeOptionsText }}</question-text>
      </ion-item>
      <selectable
        placeholder="Select"
        [title]="question.CascadeOptionsText"
        [items]="question.CascadeOptions"
        itemValue="Val"
        itemText="Text"
        [canClear]="!question.Required" />
      <ion-textarea 
        class="p-2" 
        [label]="question.CommentsText || 'Comments'" 
        labelPlacement="floating" 
        [(ngModel)]="question.MoreAdditionalText"
        rows="4" 
        type="text" 
        fill="outline" />
    </ion-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    FormsModule,
    QuestionTextComponent,
    SelectableComponent,
    CameraCaptureComponent,
    FileUploadComponent
  ]
})
export class CascadeSelectTextComponent {
  @Input({ required: true })
  question!: Question;
}
