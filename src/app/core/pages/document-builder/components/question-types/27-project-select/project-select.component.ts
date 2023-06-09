import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { SelectableComponent } from "src/app/shared/components";
import { param } from "src/app/shared/route";
import { useProjects } from "src/app/core/http/collab-plan.api";
import { ToStringValuesPipe } from "src/app/shared/pipes";

@Component({
  selector: "project-select",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="ion-no-margin" slot="end" />
        <file-upload *rxIf="question.CanHaveFiles" class="ion-no-margin" slot="end" />
      </ion-item>

      <selectable
        *rxIf="projects != null"
        placeholder="Select"
        [title]="question.QuestionText"
        [items]="projects.data() 
          | push 
          | toStringValues"
        itemValue="ID"
        itemText="Name"
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
export class ProjectSelectComponent {
  @Input({ required: true })
  question!: Question;

  siteId = param("siteId")?.toNumber();
  projects = useProjects(() => ({ siteId: this.siteId }));
}