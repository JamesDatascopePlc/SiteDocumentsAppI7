import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate, importRxFixedVirtualScroll } from "src/app/shared/imports";
import { FormsModule } from "@angular/forms";
import { IfComponent } from "src/app/shared/components";
import { useOperativeApi } from "src/app/core/http";
import { param } from "src/app/shared/route";
import { useFetchOperativesByName } from "src/app/core/http/operative.api";

@Component({
  selector: "online-operative-search",
  template: `
    <ion-searchbar [(ngModel)]="searchName" (keyup.enter)="operativeSearch.fetch()" />

    <if [condition]="operativeSearch.isLoading() | push">
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
            *rxVirtualFor="let op of operativeSearch.data(); last as isLast"
            class="w-full"
            [lines]="isLast ? 'none' : 'inset'"
            button>
            {{ op.ID }} - {{ op.Name }}
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
export class OnlineOperativeSearchComponent {
  operativeApi = useOperativeApi();

  @Input()
  noAppLimit: boolean = true;

  siteId = param("siteId")?.toNumber();
  searchName: string = "";
  
  operativeSearch = useFetchOperativesByName(() => ({
    search: this.searchName,
    noAppLimit: this.noAppLimit,
    siteId: this.siteId
  }));
}
