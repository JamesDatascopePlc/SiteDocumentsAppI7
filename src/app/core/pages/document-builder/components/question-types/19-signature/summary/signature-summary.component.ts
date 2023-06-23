import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "signature-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b >{{ question.QuestionText }}</b>
          <p>{{ question.AnswerText }}</p>
        </ion-label>
      </ion-item>
    </ion-list>

    <img *rxIf="question.SignatureDataUrl != null" [src]="question.SignatureDataUrl" />
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate()
  ]
})
export class SignatureSummaryComponent {
  @Input({ required: true })
  question!: Question;
}