import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { UtcDatePipe } from "src/app/shared/pipes";

@Component({
  selector: "date-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b class="whitespace-normal">{{ question.QuestionText }}</b>
          <p class="text-base">{{ question.DateAndTime! | utcDate }}</p>
        </ion-label>
      </ion-item>
      <ion-datetime 
        class="my-0 mx-auto"
        [value]="question.DateAndTime!.toISOString()" 
        presentation="date" />
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, UtcDatePipe]
})
export class DateSummaryComponent {
  @Input({ required: true })
  question!: Question;
}
