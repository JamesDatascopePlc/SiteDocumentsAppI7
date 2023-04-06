import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { QuestionTextComponent } from "../extras";

@Component({
  selector: "signature-question[question]",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
      </ion-item>

      <ion-item>
        <ion-input label="Print" labelPlacement="floating" type="text"></ion-input>
        <ion-button fill="clear" slot="end">
          <ion-icon name="create-outline" slot="icon-only"></ion-icon>
        </ion-button>
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
export class SignatureComponent {
  @Input()
  question!: Question;
}
