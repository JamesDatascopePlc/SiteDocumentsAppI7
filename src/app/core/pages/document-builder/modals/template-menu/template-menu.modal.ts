import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { orderBy } from "lodash-es";
import { EMPTY, expand, map, reduce } from "rxjs";
import { SiteDocument } from "src/app/core/stores/site-document/models";
import { importRxTemplate, importRxFixedVirtualScroll } from "src/app/shared/imports";
import { track } from "src/app/shared/rxjs";
import { environment } from "src/environments/environment";

export interface PaginatedList<T> {
  Items: T[],
  PageNumber: number,
  TotalPage: number,
  TotalCount: number,
  HasPreviousPage: boolean,
  HasNextPage: boolean
}

@Component({
  selector: "template-menu-modal",
  template: `
    <ion-modal #modal [isOpen]="isOpen">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title class="text-center">
              Templates
              <ion-spinner *rxIf="templatesTracking.isLoading()" class="float-right" />
            </ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <ion-list class="h-full">
            <rx-virtual-scroll-viewport [itemSize]="50">
              <ion-item *rxVirtualFor="let template of templatesTracking.data()" class="w-full" (click)="select.emit(template.DocumentID); modal.dismiss()" button>
                {{ template.DocumentTitle }}
              </ion-item>
            </rx-virtual-scroll-viewport>
          </ion-list>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    ...importRxFixedVirtualScroll()
  ]
})
export class TemplateMenuModal {
  httpClient = inject(HttpClient);

  templatesTracking = track(() => this.httpClient.get<PaginatedList<SiteDocument>>(`${environment.siteDocsApi}/TemplateApi/GetLatestTemplatesWithPagination`, {
    params: {
      pageNumber: 1,
      pageSize: 20
    }
  }).pipe(
    expand((res, idx) => res.HasNextPage
      ? this.httpClient.get<PaginatedList<SiteDocument>>(`${environment.siteDocsApi}/TemplateApi/GetLatestTemplatesWithPagination`, {
        params: {
          pageNumber: idx + 2,
          pageSize: 20
        }
      })
      : EMPTY
    ),
    map(res => res.Items),
    reduce((acc, docs) => [...acc, ...docs]),
    map(tpls => orderBy(tpls, "DocumentTitle"))
  ))
  .fire();

  @Input()
  isOpen: boolean = false;

  @Output()
  select = new EventEmitter<number>();
}
