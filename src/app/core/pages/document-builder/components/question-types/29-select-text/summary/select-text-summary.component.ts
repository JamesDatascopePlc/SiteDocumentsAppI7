import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";

@Component({
  selector: "select-text-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b class="whitespace-normal">{{ question.QuestionText }}</b>
          <p class="whitespace-normal">{{ question.SelectedOptionText }}</p>
        </ion-label>
      </ion-item>

      <ion-item *rxIf="question.OptionVal === '-1' || question.OptionVal?.includes('###2')" lines="none">
        <ion-label>
          <b class="whitespace-normal">{{ question.CascadeOptionsText || 'Other' }}</b>
          <p class="whitespace-normal">{{ question.AnswerText }}</p>
        </ion-label>
      </ion-item>

      <ion-item lines="none">
        <ion-label>
          <b class="whitespace-normal">{{ question.CommentsText || 'Comments' }}</b>
          <p class="whitespace-normal">{{ question.MoreAdditionalText }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class SelectTextSummaryComponent {
  @Input({ required: true })
  question!: Question;
}
