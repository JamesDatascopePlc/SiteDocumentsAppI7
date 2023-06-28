import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { QuestionTextComponent } from "../extras";
import { TimePickerComponent } from "src/app/shared/components";

@Component({
  selector: "linked-times-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
      </ion-item>
      <ion-item>
        <time-picker [(time)]="question.DateAndTime" class="w-full" />
      </ion-item>

      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.CascadeOptionsText }}</question-text>
      </ion-item>
      <ion-item>
        <time-picker [(time)]="question.DateAndTime2" class="w-full"></time-picker>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule, 
    QuestionTextComponent,
    TimePickerComponent
  ]
})
export class LinkedTimesComponent {
  @Input({ required: true })
  question!: Question;
}
