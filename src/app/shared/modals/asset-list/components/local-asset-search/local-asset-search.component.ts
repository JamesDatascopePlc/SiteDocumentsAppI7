import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Asset, AssetStore } from "src/app/core/stores/asset/asset.store";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "local-asset-search",
  template: `
    <ion-searchbar class="animate__animated animate__fadeIn" />

    <ion-list>
      <ion-item-sliding *rxFor="let asset of assets$">
        <ion-item button>
          {{ asset.Id }} - {{ asset.Registration }}
        </ion-item>
        <ion-item-options side="end">
          <ion-item-options color="danger">
            <ion-icon name="trash-bin-outline" />
          </ion-item-options>
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
export class LocalAssetSearchComponent {
  assetStore = inject(AssetStore);

  assets$ = this.assetStore.assets$;

  @Output()
  select = new EventEmitter<Asset>();
}
