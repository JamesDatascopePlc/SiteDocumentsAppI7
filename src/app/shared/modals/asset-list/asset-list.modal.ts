import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importNgSwitch, importRxTemplate } from "../../imports";
import { LocalAssetSearchComponent, OnlineAssetSearchComponent } from "./components";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "asset-list-modal",
  template: `
    <ion-modal #modal [trigger]="trigger" [isOpen]="isOpen">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title class="ion-text-center">Select an Asset</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="modal.dismiss()" [unpatch]>
                <ion-icon name="close-outline" slot="icon-only" />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>

          <ion-toolbar>
            <ion-segment [(ngModel)]="segment" class="w-full">
              <ion-segment-button value="local">
                <ion-icon name="phone-portrait-outline" />
              </ion-segment-button>
              <ion-segment-button value="online">
                <ion-icon name="wifi-outline" />
              </ion-segment-button>
            </ion-segment>
          </ion-toolbar>
        </ion-header>

        <ion-content [ngSwitch]="segment" class="ion-padding">
          <local-asset-search *ngSwitchCase="'local'" />
          <online-asset-search *ngSwitchCase="'online'" />
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    ...importNgSwitch(),
    FormsModule,
    LocalAssetSearchComponent,
    OnlineAssetSearchComponent
  ]
})
export class AssetListModal {
  @Input({ required: true })
  trigger!: string;

  @Input()
  isOpen: boolean = false;

  segment: "local" | "online" = "local";
}
