import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "asset-list-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label class="font-bold">{{ question.QuestionText }}</ion-label>
      </ion-item>
      <ion-item *rxFor="let asset of question.Assets" lines="none">
        {{ asset.AssetID }} - {{ asset.Name }}
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class AssetListSummaryComponent {
  @Input({ required: true })
  question!: Question;
}
