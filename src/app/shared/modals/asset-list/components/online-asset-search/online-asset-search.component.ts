import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { addEntities } from "@ngneat/elf-entities";
import { merge } from "rxjs";
import { useAssetGroups, useAssetTypes, useFetchAssetsByRegistration, useFetchAssetsByType } from "src/app/core/http/asset.api";
import { Asset, useAssetStore } from "src/app/core/stores/asset/asset.store";
import { IfComponent, SelectableComponent } from "src/app/shared/components";
import { importRxFixedVirtualScroll, importRxTemplate } from "src/app/shared/imports";
import { FusePipe } from "src/app/shared/pipes";
import { param } from "src/app/shared/route";

@Component({
  selector: "online-asset-search",
  styles: [`
    ion-list { height: calc(100% - 116px) }
  `],
  template: `
    <ion-item lines="none">
      <ion-select [(ngModel)]="lookup" label="Search Type" labelPlacement="floating" interface="popover">
        <ion-select-option value="Registration">Registration</ion-select-option>
        <ion-select-option value="Type and Group">Type and Group</ion-select-option>
      </ion-select>
    </ion-item>

    <if [condition]="lookup === 'Registration'">
      <ion-searchbar show [(ngModel)]="searchRegistration" (keyup.enter)="findAssetsByReg.fetch()" />

      <ng-container else>
        <selectable 
          placeholder="Group"
          title="Groups"
          [(value)]="groupId"
          [items]="assetGroups.data() | push"
          itemValue="GroupID"
          itemText="GroupName" />
          
        <selectable 
          placeholder="Type"
          title="Types"
          [(value)]="typeId"
          [items]="assetTypes.data() | push"
          itemValue="Id" 
          itemText="Description" 
          (itemChange)="$event != null 
            ? findAssetsByType.fetch({ typeId: $event.Id }) 
            : null" />
      </ng-container>
    </if>

    <if [condition]="isLoading$ | push">
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
            *rxVirtualFor="let asset of foundAssets$"
            (click)="add(asset); select.emit(asset);"
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
    IfComponent,
    SelectableComponent,
    FusePipe
  ]
})
export class OnlineAssetSearchComponent {
  assetStore = useAssetStore();

  assetGroups = useAssetGroups();
  assetTypes = useAssetTypes();

  siteId = param("siteId")?.toNumber();
  lookup: "Registration" | "Type and Group" = "Registration";
  
  searchRegistration: string = "";
  findAssetsByReg = useFetchAssetsByRegistration(() => ({
    searchString: this.searchRegistration,
    siteId: this.siteId
  }));

  groupId: Nullable<string>;
  typeId: Nullable<number>;
  findAssetsByType = useFetchAssetsByType(() => ({
    siteId: this.siteId
  }));

  isLoading$ = merge(
    this.findAssetsByReg.isLoading(), 
    this.findAssetsByType.isLoading()
  );
  foundAssets$ = merge(
    this.findAssetsByReg.data(), 
    this.findAssetsByType.data()
  );

  @Output()
  select = new EventEmitter<Asset>();

  add(asset: Asset) {
    this.assetStore.update(
      addEntities(asset)
    );
  }
}
