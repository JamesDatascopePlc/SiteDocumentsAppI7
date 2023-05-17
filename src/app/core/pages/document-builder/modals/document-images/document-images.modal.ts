import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CameraComponent } from "src/app/shared/components";
import { PhotoViewerDirective } from "src/app/shared/directives";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "document-images-modal",
  template: `
    <ion-modal>
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title class="text-center">Images</ion-title>
            <ion-buttons slot="end">
              <ion-button>
                <ion-icon name="close-outline" slot="icon-only" />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <ion-grid>
            <ion-row>
              <ion-col
                *rxFor="let img of images; index as idx"
                size="6"
                sizeMd="4"
                sizeLg="3">
                <ion-img photo-viewer [src]="img" />
              </ion-col>
            </ion-row>
          </ion-grid>

          <camera (takePhoto)="add($event)">
            <ion-icon name="camera-outline" slot="icon-only" />
          </camera>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule, 
    ...importRxTemplate(),
    CameraComponent,
    PhotoViewerDirective
  ]
})
export class DocumentImagesModal {
  isOpen: boolean = false;

  images: string[] = [];

  add(img64: string) {
    this.images = [
      ...this.images,
      img64
    ];
  }
}
