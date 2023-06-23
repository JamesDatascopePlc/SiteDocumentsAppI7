import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";

@Component({
  selector: "cascade-select-text-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b>{{ question.QuestionText }}</b>
          <p>{{ question.SelectedOptionText }}</p>
        </ion-label>
      </ion-item>

      <ion-item lines="none">
        <ion-label>
          <b>{{ question.CascadeOptionsText }}</b>
          <p>{{ question.SelectedCascadeOptionText }}</p>
        </ion-label>
      </ion-item>

      <ion-item lines="none">
        <ion-label>
          <b>{{ question.CommentsText || 'Comments' }}</b>
          <p>{{ question.MoreAdditionalText }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class CascadeSelectTextSummaryComponent {
  @Input({ required: true })
  question!: Question;
}
