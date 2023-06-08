import { Component, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { importRxFixedVirtualScroll, importRxTemplate } from "../../imports";
import { FusePipe } from "../../pipes";
import { AngularComponent, AngularDirective, withAfterViewInit, withGenericTemplateContextGuard, withOnChanges } from "../../lifecycles";
import { using } from "../../rxjs";

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
      <ion-label *rxLet="item(); let item" [color]="value == null ? 'medium' : ''" class="ion-text-wrap">
      {{ 
        item || placeholder
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
  itemText: keyof T | null | undefined = null;

  @Input()
  itemValue: keyof T | null | undefined = null;

  @Input()
  value: T[keyof T] | null | undefined = null;

  @Output()
  itemChange = new EventEmitter<T | null>();

  @Output()
  valueChange = new EventEmitter<any>();

  item = using(this.afterViewInit(), this.input("value"), this.itemChange)
    .calculate(() => this.itemValue != null 
      ? this.items.find(item => item[this.itemValue as keyof T] === this.value)
      : this.value
    );

  @Input()
  canClear: boolean = true;

  searchValue: string = "";

  @ContentChild(ItemsTemplateDirective, { read: ItemsTemplateDirective })
  itemsTpl!: TemplateRef<unknown>;

  select(item: T) {
    this.itemChange.emit(item);

    if (this.itemValue != null) {
      this.value = item[this.itemValue];
      this.valueChange.emit(item[this.itemValue]);
    }
  }

  clear() {
    this.value = null;
    this.itemChange.emit(null);
    this.valueChange.emit(null);
  }
}

// export class Selectable<T = unknown> {
//   id = crypto.randomUUID();

//   @Input("placeholder") set _placeholder(placeholder: string) { this.placeholder.next(placeholder); }
//   placeholder = use<string>("");

//   items: T[] = [];

//   @Input("itemText") set _itemText(itemText: keyof T | null) { this.itemText.next(itemText); }
//   itemText = use<keyof T | null>(null);

//   @Input("value") set _value(value: T) { this.value.next(value); }
//   value = use<T | null>(null);

//   label$ = combineLatest({ 
//     placeholder: this.placeholder(), 
//     itemText: this.itemText(),
//     value: this.value()
//   }).pipe(
//     map(({ placeholder, itemText, value }) => value == null 
//       ? placeholder
//       : itemText != null
//         ? value[itemText]
//         : value
//     )
//   )
// }