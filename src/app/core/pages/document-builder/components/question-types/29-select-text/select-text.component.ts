import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { SelectableComponent } from "src/app/shared/components/selectable/selectable.component";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";

@Component({
  selector: "select-text-question[question]",
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
      <ion-item>
        <ion-input label="Comments" labelPlacement="floating" type="text"></ion-input>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    QuestionTextComponent,
    SelectableComponent,
    CameraCaptureComponent,
    FileUploadComponent
  ]
})
export class SelectTextComponent {
  @Input()
  question!: Question;
}
