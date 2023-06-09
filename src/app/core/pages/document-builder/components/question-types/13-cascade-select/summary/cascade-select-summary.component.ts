import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "cascade-select-summary",
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
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class CascadeSelectSummaryComponent {
  @Input({ required: true })
  question!: Question;
}
