import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "checkbox-summary",
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
          *rxIf="!question.YesNoNA" 
          name="close-circle" 
          color="danger" />
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class CheckboxSummaryComponent {
  @Input({ required: true })
  question!: Question;
}
