import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { param } from "src/app/shared/route";

@Component({
  selector: "asset-info-page",
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Asset Info</ion-title>
        <ion-buttons slot="start">
          <ion-button>
            <ion-icon name="arrow-back-outline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

    </ion-content>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class AssetInfoComponent {
  assetId = param("assetId")?.toNumber();
  tag = param("tag");
}
