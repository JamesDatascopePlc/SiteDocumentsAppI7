import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question, Section } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "linked-bool-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <b class="whitespace-normal">{{ question.QuestionText }}</b>
      </ion-item>

      <ion-item lines="none">
        <span *rxIf="section.TableTitles[0]">{{ section.TableTitles[0] }}</span>
        
        <ion-icon *rxIf="question.YesNoNA === true" name="checkmark-circle" color="success" />
        <ion-icon *rxIf="question.YesNoNA !== true" name="remove-circle" color="secondary" />
      </ion-item>

      <ion-item lines="none">
        <span *rxIf="section.TableTitles[1]">{{ section.TableTitles[1] }}</span>

        <ion-icon *rxIf="question.NumberVal === 1" name="checkmark-circle" color="success" />
        <ion-icon *rxIf="question.NumberVal !== 1" name="remove-circle" color="secondary" />
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class LinkedBoolSummaryComponent {
  @Input({ required: true })
  question!: Question;

  @Input({ required: true })
  section!: Section;
}
