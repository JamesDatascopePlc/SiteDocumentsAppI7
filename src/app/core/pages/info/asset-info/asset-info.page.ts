import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { param } from "src/app/shared/route";
import { useAssetDetailsById, useAssetDetailsByTag } from "../../../http/asset.api";
import { merge } from "rxjs";
import { importRxTemplate } from "src/app/shared/imports";
import { DetailsListsComponent } from "../components/details-lists/details-lists.component";
import { UtcDatePipe } from "src/app/shared/pipes";

@Component({
  selector: "asset-info-page",
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Asset Info</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card *rxIf="assetInfo$; let info">
        <ion-card-content>
          <ion-list>
            <ion-item *rxIf="info.Base64Img != null" lines="none">
              <ion-img [src]="info.Base64Img" />
            </ion-item>

            <ion-item>
              <ion-label class="ion-text-wrap">
                <p class="mb-2">{{ info.TypeName }}</p>
                <p class="mb-2">{{ info.Location }}</p>
                <p class="mb-2">{{ info.Registration }}</p>
                <p class="mb-2">{{ info.AssetNotes }}</p>
                <p *rxIf="info.AcquiredDate != null" class="mb-2">
                  <b>Acquire Date: </b>{{ info.AcquiredDate | utcDate }}
                </p>
                <p *rxIf="info.DateOnSite != null" class="mb-2">
                  <b>Date on Site: </b>{{ info.DateOnSite | utcDate }}
                </p>
              </ion-label>
            </ion-item>
          </ion-list>

          <details-lists [details]="info.DetailsLists" />
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    DetailsListsComponent,
    UtcDatePipe
  ]
})
export class AssetInfoPage {
  assetId = param("assetId")?.toNumber();
  tag = param("tag");

  assetInfoById = useAssetDetailsById(this.assetId);
  assetInfoByTag = useAssetDetailsByTag(this.tag);

  assetInfo$ = merge(this.assetInfoById.data(), this.assetInfoByTag.data());
  isLoading$ = merge(this.assetInfoById.isLoading(), this.assetInfoByTag.isLoading());
}
