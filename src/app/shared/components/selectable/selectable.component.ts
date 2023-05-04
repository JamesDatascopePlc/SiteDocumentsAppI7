import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { importRxFixedVirtualScroll, importRxTemplate } from "../../imports";
import { FusePipe } from "../../pipes";

@Component({
  selector: "selectable",
  template: `
    <ion-item [id]="id" [unpatch] button>
      <ion-label [color]="value == null ? 'medium' : ''" class="ion-text-wrap">
      {{ 
        value == null 
          ? placeholder
          : itemText != null
            ? value[itemText]
            : value
      }}
      </ion-label>
      <ion-button *rxIf="canClear && value != null" (click)="$event.stopPropagation(); value = null; valueChange.emit(null)" fill="clear">
        <ion-icon name="close-outline" color="danger" slot="icon-only"></ion-icon>
      </ion-button>
      <ion-icon name="caret-down-outline" slot="end"></ion-icon>
    </ion-item>

    <ion-modal #modal [trigger]="id">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button (click)="modal.dismiss()" [unpatch] fill="clear">
                <ion-icon name="arrow-back-outline" slot="icon-only"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">{{ title }}</ion-title>
          </ion-toolbar>
          <ion-toolbar>
            <ion-searchbar 
              [(ngModel)]="searchValue"
              debounce="300" 
              placeholder="Search">
            </ion-searchbar>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list class="h-full">
            <rx-virtual-scroll-viewport [itemSize]="50">
              <ion-item 
                *rxVirtualFor="let item of items 
                  | fuse: {
                    search: searchValue,
                    keys: itemText != null 
                      ? [itemText]
                      : []
                  }; 
                  last as isLast" 
                class="w-full"
                (click)="
                  value = item; 
                  valueChange.emit(item); 
                  modal.dismiss()"
                [lines]="isLast 
                  ? 'none' 
                  : 'inset'" 
                [unpatch] 
                button>
                <ion-label class="ion-text-wrap">{{ itemText != null ? item[itemText] : item }}</ion-label>
              </ion-item>
            </rx-virtual-scroll-viewport>
          </ion-list>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  standalone: true,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    ...importRxFixedVirtualScroll(),
    FormsModule,
    FusePipe
  ]
})
export class SelectableComponent<T = unknown> {
  id = crypto.randomUUID();

  @Input()
  placeholder: string = "";

  @Input()
  title: string = "";

  @Input()
  items: T[] = [];

  @Input()
  itemText: keyof T | null = null;

  @Input()
  value: T | null = null;

  @Output()
  valueChange = new EventEmitter<T | null>();

  @Input()
  canClear: boolean = true;

  searchValue: string = "";
}
