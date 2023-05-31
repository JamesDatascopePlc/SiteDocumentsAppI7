import { ChangeDetectionStrategy, Component, Input, inject } from "@angular/core";
import { CameraResultType, CameraSource, ImageOptions, Photo } from "@capacitor/camera";
import { IonicModule } from "@ionic/angular";
import { Observable, map } from "rxjs";
import { SiteDocumentImageStore } from "src/app/core/stores/site-document-image/site-document-image.store";
import { SiteDocument } from "src/app/core/stores/site-document/models";
import { IfComponent, UploadComponent } from "src/app/shared/components";
import { CameraDirective, PhotoViewerDirective } from "src/app/shared/directives";
import { importRxTemplate } from "src/app/shared/imports";
import { AngularComponent, withOnChanges } from "src/app/shared/lifecycles";
import { DataUrlFile } from "src/app/shared/models/files/data-url-file.model";
import { isMobileApp } from "src/app/shared/plugins/platform.plugin";

@Component({
  selector: "document-image-upload",
  template: `
    <ion-button [id]="id" expand="block" fill="outline">
      Document Images
      <if [condition]="images.length > 0">
        <span show>({{ images.length }})</span>
        <ion-icon else name="images-outline" slot="end" />
      </if>
    </ion-button>

    <ion-modal #modal [trigger]="id">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title class="text-center">Images</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="modal.dismiss()">
                <ion-icon name="close-outline" slot="icon-only" />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <if [condition]="images.length === 0">
            <p show class="text-center">
              Use camera and gallery buttons to add images
            </p>

            <ion-grid else>
              <ion-row>
                <ion-col *rxFor="let img of images" size="6" sizeMd="4" sizeLg="3">
                  <ion-fab vertical="top" horizontal="end">
                    <ion-fab-button (click)="remove(img)" size="small" color="danger">
                      <ion-icon name="close-outline" />
                    </ion-fab-button>
                  </ion-fab>

                  <ion-img [src]="img" />
                </ion-col>
              </ion-row>
            </ion-grid>
          </if>

          <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <if [condition]="isMobileApp">
              <ng-container show>
                <ion-fab-button [camera]="cameraOptions" (takePhoto)="addPhoto($event)" class="ion-margin-vertical">
                  <ion-icon name="camera-outline" />
                </ion-fab-button>

                <ion-fab-button [camera]="galleryOptions" (takePhoto)="addPhoto($event)" class="ion-margin-vertical">
                  <ion-icon name="image-outline" />
                </ion-fab-button>
              </ng-container>

              <ion-fab-button else>
                <upload (uploadFiles)="uploads($event)" accept="image/*" />
                <ion-icon name="camera-outline" />
              </ion-fab-button>
            </if>
          </ion-fab>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    IfComponent,
    UploadComponent,
    CameraDirective,
    PhotoViewerDirective
  ]
})
export class DocumentImageUploadComponent extends AngularComponent(withOnChanges) {
  siteDocumentImageStore = inject(SiteDocumentImageStore);

  id = crypto.randomUUID();
  isMobileApp = isMobileApp();

  images: string[] = [];

  @Input()
  document!: SiteDocument;

  cameraOptions: ImageOptions = {
    resultType: CameraResultType.Base64
  }

  galleryOptions: ImageOptions = {
    resultType: CameraResultType.Base64,
    source: CameraSource.Photos
  }

  docImages$: Observable<string> = this.input("document").pipe(
    map(() => this.document.DocumentGroup)
  );

  addPhoto(photo: Photo) {
    this.images = [
      ...this.images,
      photo.base64String as string
    ]
  }

  uploads(files: DataUrlFile[]) {
    this.images = [
      ...this.images,
      ...files.map(f => f.dataUrl)
    ];
  }

  remove(img: string) {
    this.images = this.images.filter(i => i !== img);
  }
}
