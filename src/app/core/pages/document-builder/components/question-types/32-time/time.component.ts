import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { QuestionTextComponent } from "../extras";
import { TimePickerComponent } from "src/app/shared/components";
import { useTimeValidiator } from "./validation/time.validator";

@Component({
  selector: "time-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
      </ion-item>

      <ion-item>
        <time-picker [(time)]="question.DateAndTime" class="w-full" />
        <ion-icon name="time-outline" slot="end"></ion-icon>
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
export class TimeComponent {
  @Input({ required: true })
  question!: Question;

  validator = useTimeValidiator(() => this.question);
}
