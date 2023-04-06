import { ScrollingModule } from "@angular/cdk/scrolling";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AngularComponent } from "src/app/shared/lifecycles";
import { importRxTemplate } from "src/app/shared/imports";
import { OperativesStore } from "src/app/core/stores/operative/operatives.store";

@Component({
  selector: "online-operative-search",
  template: `
    <ion-searchbar 
      class="animate__animated animate__fadeIn">
    </ion-searchbar>

    <ion-list>
      <ion-item lines="none">
        <ion-skeleton-text [animated]="true"></ion-skeleton-text>
      </ion-item>
      <ion-item lines="none">
        <ion-skeleton-text [animated]="true"></ion-skeleton-text>
      </ion-item>
      <ion-item lines="none">
        <ion-skeleton-text [animated]="true"></ion-skeleton-text>
      </ion-item>
      <ion-item lines="none">
        <ion-skeleton-text [animated]="true"></ion-skeleton-text>
      </ion-item>
    </ion-list>

    <cdk-virtual-scroll-viewport *rxLet="searchResults$; let results" itemSize="50" minBufferPx="1200" maxBufferPx="1200">
      <ion-item 
        *cdkVirtualFor="let op of results; last as isLast"
        [lines]="isLast ? 'none' : 'inset'"
        class="animate__animated animate__flipInX animate__faster" 
        button>
        {{ op.ID }} - {{ op.Name }}
      </ion-item>
    </cdk-virtual-scroll-viewport>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    ScrollingModule
  ]
})
export class OnlineOperativeSearchComponent extends AngularComponent() {
  operativesStore = inject(OperativesStore);

  searchResults$ = this.operativesStore.searchResults$;
}
