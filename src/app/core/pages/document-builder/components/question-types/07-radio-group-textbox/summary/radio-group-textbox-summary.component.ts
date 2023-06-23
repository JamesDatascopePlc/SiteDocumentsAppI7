import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question, Section } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "radio-group-textbox-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label class="font-bold">{{ question.QuestionText }}</ion-label>
        <ion-icon *rxIf="question.YesNoNA" name="checkmark-circle" color="success" slot="end" />
        <ion-icon *rxIf="question.YesNoNA === false" name="close-circle" color="danger" slot="end" />
        <ion-icon *rxIf="question.YesNoNA == null" name="remove-circle" color="secondary" slot="end" />
      </ion-item>

      <ion-item lines="none">
        <p>{{ question.AnswerText }}</p>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class RadioGroupTextboxSummaryComponent {
  @Input({ required: true })
  question!: Question;

  @Input({ required: true })
  section!: Section;
}
