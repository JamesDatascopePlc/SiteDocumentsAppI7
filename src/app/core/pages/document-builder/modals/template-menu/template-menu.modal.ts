import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { useAllTemplates } from "src/app/core/http/template.api";
import { importRxTemplate, importRxFixedVirtualScroll } from "src/app/shared/imports";
import { FusePipe } from "src/app/shared/pipes";

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
              <ion-spinner *rxIf="templates.isLoading()" class="float-right" />
            </ion-title>
          </ion-toolbar>
          <ion-toolbar>
            <ion-searchbar [(ngModel)]="search" debounce="300" />
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <ion-list class="h-full">
            <rx-virtual-scroll-viewport [itemSize]="50">
              <ion-item *rxVirtualFor="let template of templates.data()
              | fuse: {
                search: search,
                keys: ['Title']
              }" 
              class="w-full" 
              (click)="select.emit(template.Id); modal.dismiss()" 
              button>
                {{ template.Title }}
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
    ...importRxFixedVirtualScroll(),
    FormsModule,
    FusePipe
  ]
})
export class TemplateMenuModal {
  templates = useAllTemplates();

  @Input()
  isOpen: boolean = false;
  search: string = "";

  @Output()
  select = new EventEmitter<number>();
}
