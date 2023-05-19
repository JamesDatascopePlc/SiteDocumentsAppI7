import { ChangeDetectionStrategy, Component } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Subject } from "rxjs";
import { Asset } from "src/app/core/stores/asset/asset.store";
import { IfComponent } from "src/app/shared/components";
import { importRxFixedVirtualScroll, importRxTemplate } from "src/app/shared/imports";
import { reaction } from "src/app/shared/reactions";

@Component({
  selector: "online-asset-search",
  template: `
    <ion-searchbar [(ngModel)]="searchRegistration" />
    
    <if [condition]="searchIsPending">
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

      <ion-list else class="h-full">
        <rx-virtual-scroll-viewport [itemSize]="50">
          <ion-item 
            *rxVirtualFor="let asset of assets$; last as isLast"
            class="w-full" 
            [lines]="isLast ? 'none' : 'inset'" 
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
  searchRegistration: string = "";
  searchIsPending: boolean = false;

  assets$ = new Subject<Asset[]>();

  search = reaction($entered => $entered(
    takeUntilDestroyed()
  ));
}
