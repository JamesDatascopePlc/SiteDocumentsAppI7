import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "select-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b>{{ question.QuestionText }}</b>
          <p>{{ question.SelectedOptionText }}</p>
        </ion-label>
      </ion-item>

      <ion-item *rxIf="question.OptionVal === '-1' || question.OptionVal?.includes('###2')" lines="none">
        <ion-label>
          <b>{{ question.CascadeOptionsText || 'Other' }}</b>
          <p>{{ question.AnswerText }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class SelectSummaryComponent {
  @Input({ required: true })
  question!: Question;
}
