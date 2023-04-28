import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importNgSwitch, importRxTemplate } from "../../imports";
import { LocalOperativeSearchComponent, OnlineOperativeSearchComponent } from "./components";
import { FormsModule } from "@angular/forms";
import { Operative } from "src/app/core/stores/operative/operatives.store";

@Component({
  selector: "operative-list-modal[trigger]",
  template: `
    <ion-modal #modal [trigger]="trigger" [isOpen]="isOpen">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title class="ion-text-center">Select an Operative</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="modal.dismiss()" [unpatch]>
                <ion-icon name="close-outline" slot="icon-only"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>

          <ion-toolbar>
            <ion-segment [(ngModel)]="segment" class="w-full">
              <ion-segment-button value="local">
                <ion-icon name="phone-portrait-outline"></ion-icon>
              </ion-segment-button>
              <ion-segment-button value="online">
                <ion-icon name="wifi-outline"></ion-icon>
              </ion-segment-button>
            </ion-segment>
          </ion-toolbar>
        </ion-header>
      
        <ion-content [ngSwitch]="segment" class="ion-padding">
          <local-operative-search *ngSwitchCase="'local'" [hideMyself]="hideMyself"></local-operative-search>
          <online-operative-search *ngSwitchCase="'online'"></online-operative-search>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    FormsModule,
    ...importRxTemplate(),
    ...importNgSwitch(),
    LocalOperativeSearchComponent,
    OnlineOperativeSearchComponent
  ]
})
export class OperativeListModal {
  @Input()
  trigger!: string;
  
  @Input()
  isOpen: boolean = false;

  @Input()
  hideMyself: boolean = false;

  segment: "local" | "online" = "local"

  @Output()
  operativeChange = new EventEmitter<Operative>();
}
