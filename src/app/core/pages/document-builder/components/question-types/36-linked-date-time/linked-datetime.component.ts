import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { QuestionTextComponent } from "../extras";
import { DatetimePickerComponent } from "src/app/shared/components";

@Component({
  selector: "linked-datetime-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
      </ion-item>
      <datetime-picker [(datetime)]="question.DateAndTime" />

      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.CascadeOptionsText }}</question-text>
      </ion-item>
      <datetime-picker [(datetime)]="question.DateAndTime2" />
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
export class LinkedDatetimeComponent {
  @Input({ required: true })
  question!: Question;
}
