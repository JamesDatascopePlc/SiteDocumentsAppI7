import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { QuestionTextComponent } from "../extras";

@Component({
  selector: "time-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">
          {{ question.QuestionText }}
        </question-text>
      </ion-item>

      <ion-item>

      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    QuestionTextComponent
  ]
})
export class TimeComponent {
  id = crypto.randomUUID();

  @Input({ required: true })
  question!: Question;
}
