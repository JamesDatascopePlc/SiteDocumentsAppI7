import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { UtcDatePipe } from "src/app/shared/pipes";

@Component({
  selector: "linked-dates-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b>{{ question.QuestionText }}</b>
          <p>{{ question.DateAndTime! | utcDate }}</p>
        </ion-label>
      </ion-item>
      <ion-datetime class="my-0 mx-auto" [value]="question.DateAndTime!.toISOString()" presentation="date" />

      <ion-item lines="none">
        <ion-label>
          <b>{{ question.CascadeOptionsText }}</b>
          <p>{{ question.DateAndTime2! | utcDate }}</p>
        </ion-label>
      </ion-item>
      <ion-datetime class="my-0 mx-auto" [value]="question.DateAndTime2!.toISOString()" presentation="date" />
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, UtcDatePipe]
})
export class LinkedDatesSummaryComponent {
  @Input({ required: true })
  question!: Question;
}
