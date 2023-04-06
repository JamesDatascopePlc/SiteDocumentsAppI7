import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question, Section } from "src/app/core/stores/site-document/site-document.store";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";

@Component({
  selector: "radio-group-question[section][question]",
  template: `
    <ion-item class="ion-no-padding" lines="none">
      <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
      <camera-capture *rxIf="question.CanHaveImg" class="ion-no-margin" slot="end"></camera-capture>
      <file-upload *rxIf="question.CanHaveFiles" class="ion-no-margin" slot="end"></file-upload>
    </ion-item>

    <ion-radio-group>
      <ion-list>
        <ion-item>
          <ion-radio aria-label="" color="success" [value]="true">{{ section.TableTitles[0] }}</ion-radio>
        </ion-item>

        <ion-item>
          <ion-radio aria-label="" color="danger" [value]="false">{{ section.TableTitles[1] }}</ion-radio>
        </ion-item>

        <ion-item>
          <ion-radio aria-label="" [value]="null">{{ section.TableTitles[2] }}</ion-radio>
        </ion-item>
      </ion-list>
    </ion-radio-group>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    QuestionTextComponent,
    CameraCaptureComponent,
    FileUploadComponent
  ]
})
export class RadioGroupComponent {
  @Input()
  section!: Section;
  
  @Input()
  question!: Question;
}
