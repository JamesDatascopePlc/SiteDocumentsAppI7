import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { isMobileApp } from "src/app/shared/plugins/platform.plugin";
import { QuestionTextComponent } from "../extras";

@Component({
  selector: "asset-list-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text>{{ question.QuestionText }}</question-text>
        <ion-button *rxIf="isMobileApp" fill="clear" slot="end">
          <ion-icon name="scan-outline" slots="icon-only"></ion-icon>
        </ion-button>
        <ion-button fill="clear" slot="end">
          <ion-icon name="search-outline" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-item>
    </ion-list>

    <ion-list>
      <ion-item-sliding *rxFor="let asset of question.Assets; last as isLast">
        <ion-item [lines]="isLast ? 'none' : 'inset'" button>
          <ion-label>{{ asset.AssetID }}: {{ asset.Name }}</ion-label>
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
    QuestionTextComponent
  ]
})
export class AssetListComponent {
  @Input({ required: true })
  question!: Question;

  isMobileApp = isMobileApp();
}
