import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Photo } from "@capacitor/camera";
import { IonicModule } from "@ionic/angular";
import { IfComponent, UploadComponent } from "src/app/shared/components";
import { PhotoViewerDirective, TakePhotoDirective, UploadPhotoDirective } from "src/app/shared/directives";
import { importRxTemplate } from "src/app/shared/imports";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";
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
                <ion-col *rxFor="let img of images; index as idx" size="6" sizeMd="4" sizeLg="3">
                  <ion-fab vertical="top" horizontal="end">
                    <ion-fab-button (click)="remove(idx)" size="small" color="danger">
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
                <ion-fab-button (takePhoto)="addPhoto($event)" class="ion-margin-vertical">
                  <ion-icon name="camera-outline" />
                </ion-fab-button>

                <ion-fab-button (uploadPhoto)="addPhoto($event)" class="ion-margin-vertical">
                  <ion-icon name="image-outline" />
                </ion-fab-button>
              </ng-container>

              <ion-fab-button else>
                <upload (uploadFiles)="addUploads($event)" accept="image/*" [multiple]="true" />
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
    TakePhotoDirective,
    UploadPhotoDirective,
    PhotoViewerDirective
  ]
})
export class DocumentImageUploadComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  id = crypto.randomUUID();
  isMobileApp = isMobileApp();

  @Input()
  images: string[] = [];

  @Output()
  imagesChange = new EventEmitter<string[]>();
  imagesUpdate = (update: Func<string[], string[]>) => {
    this.images = update(this.images);
    this.imagesChange.emit(this.images);
  }

  addPhoto(photo: Photo) {
    this.imagesUpdate(images => [...images, photo.base64String!]);
  }

  addUploads(files: DataUrlFile[]) {
    const imgs = files.map(f => f.dataUrl);
    this.imagesUpdate(images => [...images, ...imgs]);
  }

  remove(idx: number) {
    this.imagesUpdate(images => images.removeAt(idx));
  }
}
