import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Asset, useAssetStore } from "src/app/core/stores/asset/asset.store";
import { importRxTemplate } from "src/app/shared/imports";
import { FusePipe } from "src/app/shared/pipes";

@Component({
  selector: "local-asset-search",
  template: `
    <ion-searchbar [(ngModel)]="searchRegistration" class="animate__animated animate__fadeIn" debounce="300" />

    <ion-list>
      <ion-item-sliding *rxFor="let asset of assets()
        | fuse: {
          search: searchRegistration,
          keys: ['Registration']
        }">
        <ion-item (click)="select.emit(asset)" button>
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
    ...importRxTemplate(),
    FormsModule,
    FusePipe
  ]
})
export class LocalAssetSearchComponent {
  assets = useAssetStore();
  searchRegistration: string = "";

  @Output()
  select = new EventEmitter<Asset>();
}