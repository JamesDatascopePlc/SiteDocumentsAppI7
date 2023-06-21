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
          <b class="whitespace-normal">{{ question.QuestionText }}</b>
          <p class="whitespace-normal">{{ question.SelectedOptionText }}</p>
        </ion-label>
      </ion-item>

      <ion-item lines="none">
        <ion-label>
          <b class="whitespace-normal">{{ question.CascadeOptionsText }}</b>
          <p class="whitespace-normal">{{ question.SelectedCascadeOptionText }}</p>
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
