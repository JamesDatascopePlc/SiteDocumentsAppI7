import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { BarcodeScannerDirective } from "src/app/shared/directives";
import { importRxTemplate } from "src/app/shared/imports";
import { isMobileApp } from "src/app/shared/plugins/platform.plugin";
import { QuestionTextComponent } from "../extras";

@Component({
  selector: "operative-list-question[question]",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text>{{ question.QuestionText }}</question-text>
        <ion-button *rxIf="isMobileApp" fill="clear" slot="end">
          <ion-icon name="scan-outline" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button fill="clear" slot="end">
          <ion-icon name="search-outline" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-item>
    </ion-list>

    <ion-list>
      <ion-item-sliding *rxFor="let operative of question.Operatives; last as isLast">
        <ion-item [lines]="isLast ? 'none' : 'inset'">
          {{ operative.AttendeeID }}: {{ operative.Name }}
        </ion-item>

        <ion-item-options side="end">
          <ion-item-option color="danger">
            <ion-icon name="trash-outline" slot="icon-only"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule, 
    ...importRxTemplate(),
    BarcodeScannerDirective,
    QuestionTextComponent
  ]
})
export class OperativeListComponent {
  @Input()
  question!: Question;

  isMobileApp = isMobileApp();
}
