import { ScrollingModule } from "@angular/cdk/scrolling";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";
import { importRxTemplate } from "../../imports";
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
          <cdk-virtual-scroll-viewport itemSize="50" minBufferPx="1200" maxBufferPx="1200">
            <ion-list>
              <ion-item 
                *cdkVirtualFor="let item of items 
                  | fuse: {
                    search: searchValue,
                    keys: itemText != null 
                      ? [itemText]
                      : []
                  }; 
                  last as isLast" 
                (click)="value = item; valueChange.emit(item); modal.dismiss()"
                [lines]="isLast ? 'none' : 'inset'" 
                [unpatch] 
                button>
                <ion-label class="ion-text-wrap">{{ itemText != null ? item[itemText] : item }}</ion-label>
              </ion-item>
            </ion-list>
          </cdk-virtual-scroll-viewport>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  standalone: true,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    FormsModule,
    ScrollingModule,
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
