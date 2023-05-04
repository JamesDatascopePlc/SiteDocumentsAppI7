import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { importRxFixedVirtualScroll, importRxTemplate } from "../../imports";
import { FusePipe } from "../../pipes";
import { IfComponent } from "../if/if.component";

@Component({
  selector: "multi-selectable",
  template: `
    <ion-item [id]="id" [unpatch] button>
      <ion-label [color]="values.length > 0 ? 'medium' : ''" class="ion-text-wrap">
        <if [condition]="values.length === 0">
          <ion-label show color="medium" class="ion-text-wrap">{{ placeholder }}</ion-label>
          <ion-label else>
            <p *rxFor="let text of selectedTexts">{{ text }}</p>
          </ion-label>
        </if>
      </ion-label>
      <ion-button *rxIf="canClear && values.length > 0" (click)="$event.stopPropagation(); values = []; valuesChange.emit([])" fill="clear">
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
            <ion-searchbar [(ngModel)]="searchValue" placeholder="Search"></ion-searchbar>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list class="h-full">
            <rx-virtual-scroll-viewport [itemSize]="50">
              <ion-item 
                *rxVirtualFor="let item of items | fuse: { 
                  search: searchValue,
                  keys: itemText != null 
                    ? [itemText]
                    : []
                }; 
                last as isLast" 
                (click)="select(item)"
                [lines]="isLast ? 'none' : 'inset'" 
                button>
                <ion-label class="ion-text-wrap">{{ itemText != null ? item[itemText] : item }}</ion-label>
                <ion-icon 
                  *rxIf="selectedValues.includes(itemVal != null ? item[itemVal].toString() : item.toString())" 
                  name="checkmark-outline" 
                  slot="end">
                </ion-icon>
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
    IfComponent,
    ...importRxTemplate(),
    ...importRxFixedVirtualScroll(),
    FormsModule,
    FusePipe
  ]
})
export class MultiSelectableComponent<T extends { [key: string]: object } = {}> {
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
  itemVal: keyof T | null = null;

  @Input()
  values: T[] = [];

  get selectedValues() {
    return this.itemVal != null
      ? this.values.map(val => val[this.itemVal as keyof T] + "")
      : this.values.map(val => val + "");
  }

  get selectedTexts() {
    return this.itemText != null
      ? this.values.map(val => val[this.itemText as keyof T] + "")
      : this.values.map(val => val + "");
  }

  @Output()
  valuesChange = new EventEmitter<T[]>();

  @Input()
  canClear: boolean = true;

  @Input()
  searchValue: string = "";

  select(item: T) {
    const val = this.itemVal != null
      ? item[this.itemVal as keyof T] + ""
      : item + "";

    this.values = this.selectedValues.includes(val)
      ? this.values.filter(itemVal => this.itemVal != null 
        ? (itemVal[this.itemVal] + "") !== val
        : (itemVal + "") !== val
      )
    : [...this.values, item];

    this.valuesChange.emit(this.values);
  }
}
