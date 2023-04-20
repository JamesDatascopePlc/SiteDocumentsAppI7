import { ScrollingModule } from "@angular/cdk/scrolling";
import { ChangeDetectionStrategy, Component, Input, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AngularComponent } from "src/app/shared/lifecycles";
import { importRxTemplate } from "src/app/shared/imports";
import { OperativeSearchParams, OperativesStore } from "src/app/core/stores/operative/operatives.store";
import { reaction } from "src/app/shared/reactions";
import { FormsModule } from "@angular/forms";
import { of, switchMap } from "rxjs";
import { IfComponent } from "src/app/shared/components";

@Component({
  selector: "online-operative-search",
  template: `
    <ion-searchbar 
      [(ngModel)]="searchName"
      (keyup.enter)="search()">
    </ion-searchbar>

    <if [condition]="searchResultsIsPending$ | push">
      <ion-list show>
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

      <cdk-virtual-scroll-viewport else *rxLet="searchResults$; let results" itemSize="50" minBufferPx="1200" maxBufferPx="1200">
        <ion-item 
          *cdkVirtualFor="let op of results; last as isLast"
          [lines]="isLast ? 'none' : 'inset'"
          button>
          {{ op.ID }} - {{ op.Name }}
        </ion-item>
      </cdk-virtual-scroll-viewport>
    </if>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    FormsModule,
    ScrollingModule,
    IfComponent
  ]
})
export class OnlineOperativeSearchComponent extends AngularComponent() {
  operativesStore = inject(OperativesStore);

  searchResults$ = this.operativesStore.searchResults$;
  searchResultsIsPending$ = this.operativesStore.searchResultsIsPending$;

  @Input()
  noAppLimit: boolean = true;

  searchName: string = "";
  
  searchParams$() {
    return of<OperativeSearchParams>({ search: this.searchName, noAppLimit: this.noAppLimit });
  }
  
  search = reaction($entered => $entered.pipe(
    this.takeUntilDestroyed(),
    switchMap(() => this.operativesStore.getSearchResults(this.searchParams$()))
  ));
}
