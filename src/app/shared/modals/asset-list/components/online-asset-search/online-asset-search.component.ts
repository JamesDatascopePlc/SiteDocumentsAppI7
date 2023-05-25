import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Asset } from "src/app/core/stores/asset/asset.store";
import { IfComponent } from "src/app/shared/components";
import { importRxFixedVirtualScroll, importRxTemplate } from "src/app/shared/imports";
import { track, use } from "src/app/shared/rxjs";
import { environment } from "src/environments/environment";

@Component({
  selector: "online-asset-search",
  styles: [`
    ion-list { height: calc(100% - 58px) }
  `],
  template: `
    <ion-searchbar [(ngModel)]="searchRegistration" (keyup.enter)="search.next()" />
    
    <ng-container *rxIf="assetsTracking$; let assetsTracking">
      <if [condition]="assetsTracking.isLoading$ | push">
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
              *rxVirtualFor="let asset of assetsTracking.data$"
              (click)="select.emit(asset)"
              class="w-full" 
              button>
              {{ asset.Id }} - {{ asset.Registration }}
            </ion-item>
          </rx-virtual-scroll-viewport>
        </ion-list>
      </if>
    </ng-container>
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
  httpClient = inject(HttpClient);

  searchRegistration: string = "";
  search = use();

  assetsTracking$ = this.search(() => track(() => this.httpClient.get<Asset[]>(`${environment.siteDocsApi}/AssetApi/GetAssetsByReg`, {
    params: {
      searchString: this.searchRegistration
    }
  })));
  
  @Output()
  select = new EventEmitter<Asset>();
}
