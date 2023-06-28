import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { IfComponent, SelectableComponent } from "src/app/shared/components";
import { param } from "src/app/shared/route";
import { useProjects } from "src/app/core/http/collab-plan.api";
import { ToStringValuesPipe } from "src/app/shared/pipes";
import { useSelectValidator } from "../05-select/validation/select.validator";

@Component({
  selector: "project-select",
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
        [items]="projects.data() 
          | push 
          | toStringValues"
        itemValue="ID"
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
    IfComponent,
    ToStringValuesPipe
  ]
})
export class ProjectSelectComponent {
  @Input({ required: true })
  question!: Question;
  validator = useSelectValidator(() => this.question);

  siteId = param("siteId")?.toNumber();
  projects = useProjects(this.siteId);
}