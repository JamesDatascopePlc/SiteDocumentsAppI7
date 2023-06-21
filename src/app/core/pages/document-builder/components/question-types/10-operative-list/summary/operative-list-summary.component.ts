import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "operative-list-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <b class="whitespace-normal">{{ question.QuestionText }}</b>
      </ion-item>
      <ion-item *rxFor="let op of question.Operatives" lines="none">
        {{ op.AttendeeID }} - {{ op.Name }}
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class OperativeListSummaryComponent {
  @Input({ required: true })
  question!: Question;
}
