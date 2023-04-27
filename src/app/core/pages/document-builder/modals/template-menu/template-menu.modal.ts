import { ScrollingModule } from "@angular/cdk/scrolling";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "template-menu-modal[trigger]",
  template: `
    <ion-modal #modal [trigger]="trigger" [isOpen]="isOpen">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title class="text-center">Templates</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="modal.dismiss()">
                <ion-icon name="close-outline" slot="icon-only"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <cdk-virtual-scroll-viewport itemSize="50" minBufferPx="1200" maxBufferPx="1200">
            <ion-list>
              <ion-item button></ion-item>
            </ion-list>
          </cdk-virtual-scroll-viewport>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ScrollingModule
  ]
})
export class TemplateMenuModal {
  @Input()
  trigger!: string;

  @Input()
  isOpen: boolean = false;

  
}
