import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate, importRxFixedVirtualScroll } from "src/app/shared/imports";
import { FormsModule } from "@angular/forms";
import { IfComponent } from "src/app/shared/components";
import { useOperativeApi } from "src/app/core/http";
import { param } from "src/app/shared/route";
import { OperativeSearchResult, useFetchOperativesByName } from "src/app/core/http/operative.api";
import { Operative, useOperativeStore } from "src/app/core/stores/operative/operatives.store";
import { addEntities } from "@ngneat/elf-entities";

@Component({
  selector: "online-operative-search",
  styles: [`
    ion-list { height: calc(100% - 58px); }
  `],
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

      <ion-list else>
        <rx-virtual-scroll-viewport [itemSize]="50">
          <ion-item 
            *rxVirtualFor="let op of operativeSearch.data(); last as isLast"
            class="w-full"
            (click)="add(op)"
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
  operativeStore = useOperativeStore();
  operativeApi = useOperativeApi();

  @Input()
  noAppLimit: boolean = true;

  @Output()
  select = new EventEmitter<Operative>();

  siteId = param("siteId")?.toNumber();
  searchName: string = "";
  
  operativeSearch = useFetchOperativesByName(() => ({
    search: this.searchName,
    noAppLimit: this.noAppLimit,
    siteId: this.siteId
  }));

  add(operative: OperativeSearchResult) {
    this.operativeStore.update(
      addEntities({
        ID: operative.ID,
        Name: operative.Name
      })
    );

    this.select.emit(operative);
  }
}
