import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "radio-group-textbox-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <b class="whitespace-normal">{{ question.QuestionText }}</b>
      </ion-item>
      <ion-item lines="none">
        <ion-icon 
          *rxIf="question.YesNoNA" 
          name="checkmark-circle" 
          color="success" />
        <ion-icon 
          *rxIf="question.YesNoNA === false" 
          name="close-circle" 
          color="danger" />
        <ion-icon 
          *rxIf="question.YesNoNA == null" 
          name="remove-circle" 
          color="secondary" />
      </ion-item>

      <ion-item lines="none">
        <p class="whitespace-normal">{{ question.AnswerText }}</p>
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
}
