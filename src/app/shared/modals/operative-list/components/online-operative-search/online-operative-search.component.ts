import { ChangeDetectionStrategy, Component, Input, inject } from "@angular/core";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonicModule } from "@ionic/angular";
import { importRxTemplate, importRxFixedVirtualScroll } from "src/app/shared/imports";
import { OperativesStore } from "src/app/core/stores/operative/operatives.store";
import { reaction } from "src/app/shared/reactions";
import { FormsModule } from "@angular/forms";
import { switchMap } from "rxjs";
import { IfComponent } from "src/app/shared/components";

@Component({
  selector: "online-operative-search",
  template: `
    <ion-searchbar [(ngModel)]="searchName" (keyup.enter)="search()" />

    <if [condition]="searchResultsIsPending$ | push">
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
            *rxVirtualFor="let op of searchResults$; last as isLast"
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
  operativesStore = inject(OperativesStore);

  searchResults$ = this.operativesStore.searchResults$;
  searchResultsIsPending$ = this.operativesStore.searchResultsIsPending$;

  @Input()
  noAppLimit: boolean = true;

  searchName: string = "";
  
  search = reaction($entered => $entered.pipe(
    takeUntilDestroyed(),
    switchMap(() => this.operativesStore.getSearchResults({ search: this.searchName, noAppLimit: this.noAppLimit }))
  ));
}
