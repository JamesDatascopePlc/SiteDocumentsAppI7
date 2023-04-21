import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { SelectableComponent } from "src/app/shared/components";
import { Question } from "src/app/core/stores/site-document/models";

@Component({
  selector: "cascade-select-question[question]",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="ion-no-margin" slot="end"></camera-capture>
        <file-upload *rxIf="question.CanHaveFiles" class="ion-no-margin" slot="end"></file-upload>
      </ion-item>
      <selectable 
        placeholder="Select"
        [title]="question.QuestionText"
        [items]="question.Options"
        itemText="Text"
        [canClear]="!question.Required">
      </selectable>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.CascadeOptionsText }}</question-text>
      </ion-item>
      <selectable
        placeholder="Select"
        [title]="question.CascadeOptionsText"
        [items]="question.CascadeOptions"
        itemText="Text"
        [canClear]="!question.Required">
      </selectable>
    </ion-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    QuestionTextComponent,
    SelectableComponent,
    CameraCaptureComponent,
    FileUploadComponent
  ]
})
export class CascadeSelectComponent {
  @Input()
  question!: Question;
}
