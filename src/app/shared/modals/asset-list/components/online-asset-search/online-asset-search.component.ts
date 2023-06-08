import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { useAssetApi } from "src/app/core/http";
import { Asset, useAssetStore } from "src/app/core/stores/asset/asset.store";
import { IfComponent } from "src/app/shared/components";
import { importRxFixedVirtualScroll, importRxTemplate } from "src/app/shared/imports";
import { track, use } from "src/app/shared/rxjs";

@Component({
  selector: "online-asset-search",
  styles: [`
    ion-list { height: calc(100% - 58px) }
  `],
  template: `
    <ion-searchbar [(ngModel)]="searchRegistration" (keyup.enter)="findAssets.fire()" />
    
    <if [condition]="findAssets.isLoading() | push">
      <ion-list show>
        <ion-item lines="none">
          <ion-skeleton-text [animated]="true" />
        </ion-item>
        <ion-item lines="none">
          <ion-skeleton-text [animated]="true" />
        </ion-item>
        <ion-item lines="none">
          <ion-skeleton-text [animated]="true" />
        </ion-item>
        <ion-item lines="none">
          <ion-skeleton-text [animated]="true" />
        </ion-item>
      </ion-list>

      <ion-list else>
        <rx-virtual-scroll-viewport [itemSize]="50">
          <ion-item 
            *rxVirtualFor="let asset of findAssets.data()"
            (click)="addAsset(asset); select.emit(asset);"
            class="w-full" 
            button>
            {{ asset.Id }} - {{ asset.Registration }}
          </ion-item>
        </rx-virtual-scroll-viewport>
      </ion-list>
    </if>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    ...importRxFixedVirtualScroll(),
    FormsModule,
    IfComponent
  ]
})
export class OnlineAssetSearchComponent {
  assetApi = useAssetApi();
  assets = useAssetStore();

  searchRegistration: string = "";
  search = use();

  findAssets = track(() => this.assetApi.getAssetByRegistration({
    searchString: this.searchRegistration
  }));

  @Output()
  select = new EventEmitter<Asset>();

  addAsset(asset: Asset) {
    this.assets.mutate(assets => [...assets, asset]);
  }
}
