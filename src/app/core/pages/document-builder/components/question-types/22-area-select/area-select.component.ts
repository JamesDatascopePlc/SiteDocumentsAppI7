import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { SelectableComponent } from "src/app/shared/components";
import { Question } from "src/app/core/stores/site-document/models";
import { useAreas } from "src/app/core/http/login.api";
import { ToStringValuesPipe } from "src/app/shared/pipes";

@Component({
  selector: "area-select-question",
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
        [items]="areas.data() 
          | push 
          | toStringValues"
        itemValue="Id"
        itemText="Name"
        [(value)]="question.OptionVal"
        (itemChange)="question.SelectedOptionText = $event?.Name"
        [canClear]="!question.Required" />
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
    FileUploadComponent,
    ToStringValuesPipe
  ]
})
export class AreaSelectComponent {
  @Input({ required: true })
  question!: Question;
  
  areas = useAreas();
}