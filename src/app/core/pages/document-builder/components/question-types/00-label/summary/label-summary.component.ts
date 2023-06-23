import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";

@Component({
  selector: 'label-summary',
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label class="font-bold">{{ question.QuestionText }}</ion-label>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule
  ]
})
export class LabelSummaryComponent {
  @Input({ required: true })
  question!: Question;
}
