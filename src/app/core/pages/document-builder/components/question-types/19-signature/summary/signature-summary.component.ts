import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";

@Component({
  selector: "signature-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b class="whitespace-normal">{{ question.QuestionText }}</b>
          <p class="whitespace-normal text-base">{{ question.AnswerText }}</p>
        </ion-label>
      </ion-item>
    </ion-list>

    <img [src]="question.SignatureDataUrl" />
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class SignatureSummaryComponent {
  @Input({ required: true })
  question!: Question;
}