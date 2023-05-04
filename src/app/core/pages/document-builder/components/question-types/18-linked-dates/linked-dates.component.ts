import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { DatetimePickerComponent } from "src/app/shared/components/datetime-picker/datetime-picker.component";
import { QuestionTextComponent } from "../extras";

@Component({
  selector: "linked-dates-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
      </ion-item>
      <datetime-picker [(datetime)]="question.DateAndTime" presentation="date"></datetime-picker>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.CascadeOptionsText }}</question-text>
      </ion-item>
      <datetime-picker [(datetime)]="question.DateAndTime2" presentation="date"></datetime-picker>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    QuestionTextComponent,
    DatetimePickerComponent
  ]
})
export class LinkedDatesComponent {
  @Input({ required: true })
  question!: Question;
}
