import { Component, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { importRxFixedVirtualScroll, importRxTemplate } from "../../imports";
import { FusePipe } from "../../pipes";
import { AngularComponent, AngularDirective, withAfterViewInit, withGenericTemplateContextGuard, withOnChanges } from "../../lifecycles";
import { merge } from "rxjs";

@Directive({
  selector: "ng-template[items]",
  standalone: true
})
export class ItemsTemplateDirective<T> extends AngularDirective(withGenericTemplateContextGuard) {
  @Input()
  items!: T[];
}

@Component({
  selector: "selectable",
  template: `
    <!-- <ng-template #itemTpl let-item>
      <ion-label class="ion-text-wrap">{{ itemText != null ? item[itemText] : item }}</ion-label>
    </ng-template> -->

    <ion-item [id]="id" detail="false" button>
      <ion-label *rxLet="item$; let item" [color]="value == null ? 'medium' : ''" class="ion-text-wrap">
      {{ 
        item != null 
          ? itemText != null 
          ? item[itemText] 
          : item 
          : placeholder
      }}
      </ion-label>
      <ion-button *rxIf="canClear && value != null" (click)="$event.stopPropagation(); clear();" fill="clear">
        <ion-icon name="close-outline" color="danger" slot="icon-only" />
      </ion-button>
      <ion-icon name="caret-down-outline" slot="end" />
    </ion-item>

    <ion-modal #modal [trigger]="id">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button (click)="modal.dismiss()" [unpatch] fill="clear">
                <ion-icon name="arrow-back-outline" slot="icon-only" />
              </ion-button>
            </ion-buttons>
            <ion-title class="ion-text-center">{{ title }}</ion-title>
          </ion-toolbar>
          <ion-toolbar>
            <ion-searchbar 
              [(ngModel)]="searchValue"
              debounce="300" 
              placeholder="Search" />
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
                (click)="select(item); modal.dismiss();"
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
export class SelectableComponent<T = unknown> extends AngularComponent(withAfterViewInit, withOnChanges) {
  id = crypto.randomUUID();

  @Input()
  placeholder: string = "";

  @Input()
  title: string = "";

  @Input()
  items: T[] = [];

  @Input()
  itemText: Nullable<keyof T> = null;

  @Input()
  itemValue: Nullable<keyof T> = null;

  @Input()
  value: Nullable<T | T[keyof T]> = null;

  @Output()
  itemChange = new EventEmitter<T | null>();

  @Output()
  valueChange = new EventEmitter<any>();

  item$ = merge(this.afterViewInit(), this.input("items"), this.input("value"), this.itemChange).map(() => this.itemValue != null 
    ? this.items?.find(item => item[this.itemValue as keyof T] === this.value)
    : this.value as T
  );

  @Input()
  canClear: boolean = true;

  searchValue: string = "";

  @ContentChild(ItemsTemplateDirective, { read: ItemsTemplateDirective })
  itemsTpl!: TemplateRef<unknown>;

  select(item: T) {
    if (this.itemValue != null) {
      this.value = item[this.itemValue];
      this.valueChange.emit(item[this.itemValue]);
    } else {
      this.value = item;
    }

    this.itemChange.emit(item);
  }

  clear() {
    this.value = null;
    this.itemChange.emit(null);
    this.valueChange.emit(null);
  }
}