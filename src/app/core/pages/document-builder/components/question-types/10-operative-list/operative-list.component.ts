import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { BarcodeScannerDirective } from "src/app/shared/directives";
import { importRxTemplate } from "src/app/shared/imports";
import { isMobileApp } from "src/app/shared/plugins/platform.plugin";
import { QuestionTextComponent } from "../extras";
import { OperativeListModal } from "src/app/shared/modals/operative-list/operative-list.modal";

@Component({
  selector: "operative-list-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text>{{ question.QuestionText }}</question-text>
        <ion-button *rxIf="isMobileApp" fill="clear" slot="end">
          <ion-icon name="scan-outline" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button [id]="id" fill="clear" color="secondary" slot="end">
          <ion-icon name="search-outline" slot="icon-only"></ion-icon>
        </ion-button>

        <operative-list-modal [trigger]="id"></operative-list-modal>
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
    OperativeListModal,
    BarcodeScannerDirective,
    QuestionTextComponent
  ]
})
export class OperativeListComponent {
  id = crypto.randomUUID();

  @Input({ required: true })
  question!: Question;

  isMobileApp = isMobileApp();
}
