import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";

@Component({
  selector: "number-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b class="whitespace-normal">{{ question.QuestionText }}</b>
          <p class="whitespace-normal text-base">{{ question.NumberVal }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class NumberSummaryComponent {
  @Input({ required: true })
  question!: Question;
}
