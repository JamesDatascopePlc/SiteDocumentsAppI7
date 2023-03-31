import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/site-document.store";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "asset-list-question[question]",
  template: `
    <ion-button>
      <ion-icon name="scan-outline" slots="icon-only"></ion-icon>
    </ion-button>
    <ion-button>
      <ion-icon name="search-outline" slot="icon-only"></ion-icon>
    </ion-button>

    <ion-list>
      <ion-item-sliding *rxFor="let asset of question.Assets">
        <ion-item button>
          <ion-label>{{ asset.AssetID }}: {{ asset.Name }}</ion-label>
        </ion-item>

        <ion-item-options side="end">
          <ion-item-option></ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate()
  ]
})
export class AssetListComponent {
  @Input()
  question!: Question;
}
