import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { isMobileApp } from "src/app/shared/plugins/platform.plugin";
import { QuestionTextComponent } from "../extras";
import { AssetListModal } from "src/app/shared/modals/asset-list/asset-list.modal";
import { Asset } from "src/app/core/stores/asset/asset.store";

@Component({
  selector: "asset-list-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text>{{ question.QuestionText }}</question-text>
        <ion-button *rxIf="isMobileApp" fill="clear" slot="end">
          <ion-icon name="scan-outline" slots="icon-only" />
        </ion-button>
        <ion-button [id]="id" fill="clear" slot="end">
          <asset-list-modal [trigger]="id" (select)="select($event)" />
          <ion-icon name="search-outline" slot="icon-only" />
        </ion-button>
      </ion-item>
    </ion-list>

    <ion-list>
      <ion-item-sliding *rxFor="let asset of question.Assets; last as isLast">
        <ion-item [lines]="isLast ? 'none' : 'inset'" button>
          <ion-label>{{ asset.AssetID }}: {{ asset.Name }}</ion-label>
        </ion-item>

        <ion-item-options side="end">
          <ion-item-option color="danger" (click)="remove(asset.AssetID)">
            <ion-icon name="trash-outline" slot="icon-only" />
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
    QuestionTextComponent,
    AssetListModal
  ]
})
export class AssetListComponent {
  id = crypto.randomUUID();

  @Input({ required: true })
  question!: Question;

  isMobileApp = isMobileApp();

  select(asset: Asset) {
    if (this.question.Assets.find(a => a.AssetID === asset.Id) == null)
      this.question.Assets.push({
        AssetID: asset.Id,
        Name: asset.Registration || "",
        Tag: ""
      });
  }

  remove(id: number) {
    this.question.Assets = this.question.Assets.filter(a => a.AssetID !== id);
  }
}
