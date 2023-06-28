import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { SelectableComponent } from "src/app/shared/components/selectable/selectable.component";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { FormsModule } from "@angular/forms";
import { useSelectTextValidator } from "./validation/select-text.validator";

@Component({
  selector: "select-text-question",
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
        [(value)]="question.OptionVal"
        (itemChange)="question.SelectedOptionText = $event?.Text"
        itemValue="Val"
        itemText="Text"
        [canClear]="!question.Required" />
      <ion-textarea 
        *rxIf="question.OptionVal === '-1' || question.OptionVal?.includes('###2')" 
        class="p-2"
        [label]="question.CascadeOptionsText || 'Other'" 
        labelPlacement="floating" 
        [(ngModel)]="question.AnswerText"
        rows="3" 
        fill="outline" />
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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class SelectTextComponent {
  @Input({ required: true })
  question!: Question;

  validator = useSelectTextValidator(() => this.question);
}
