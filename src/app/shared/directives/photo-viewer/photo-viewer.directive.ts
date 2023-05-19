import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, Directive, HostListener, Input, inject } from "@angular/core";
import { IonicModule, ModalController } from "@ionic/angular";

@Component({
  selector: "photo-viewer",
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button (click)="close()">
            <ion-icon slot="icon-only" name="close" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <swiper-container>
        <swiper-slide>
          <img class="max-h-full max-w-full" [src]="src" />
        </swiper-slide>
      </swiper-container>
    </ion-content>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule]
})
class PhotoViewerComponent {
  modalCtrl = inject(ModalController);

  @Input({ required: true })
  src!: string;

  close() {
    this.modalCtrl.dismiss();
  }
}

@Directive({
  selector: "[photo-viewer]",
  standalone: true
})
export class PhotoViewerDirective {
  modalCtrl = inject(ModalController);

  @Input()
  src!: string;

  @HostListener("click")
  async view() {
    // replace with angular lifecycle
    const modal = await this.modalCtrl.create({
      component: PhotoViewerComponent,
      componentProps: {
        src: this.src
      }
    });

    modal.present();
  }
}
