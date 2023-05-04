import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxFixedVirtualScroll, importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "multi-checkbox-modal[trigger]",
  template: `
    <ion-modal #modal [trigger]="trigger">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title class="text-center">Select Responses</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="modal.dismiss()">
                <ion-icon name="close-outline" slot="icon-only"></ion-icon>
              </ion-button>
            </ion-buttons>
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
              <ion-item *rxVirtualFor="let question of questions">
                <ion-checkbox></ion-checkbox>
              </ion-item>
            </rx-virtual-scroll-viewport>
          </ion-list>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    ...importRxFixedVirtualScroll(),
    FormsModule
  ]
})
export class MultiCheckboxModal {
  @Input()
  trigger!: string;

  @Input()
  questions: Question[] = [];

  searchValue: string = "";
}
