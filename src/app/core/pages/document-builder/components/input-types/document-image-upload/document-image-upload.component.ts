import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Photo } from "@capacitor/camera";
import { IonicModule } from "@ionic/angular";
import { addEntities, deleteEntities } from "@ngneat/elf-entities";
import { combineLatest, map, tap } from "rxjs";
import { useUploadDocument, useUploadDocumentImages } from "src/app/core/http/site-document.api";
import { useDocumentImageStore } from "src/app/core/stores/site-document-image/site-document-image.store";
import { SiteDocumentImage } from "src/app/core/stores/site-document/models/site-document.model";
import { IfComponent, UploadComponent } from "src/app/shared/components";
import { PhotoViewerDirective, TakePhotoDirective, UploadPhotoDirective } from "src/app/shared/directives";
import { importRxTemplate } from "src/app/shared/imports";
import { DataUrlFile } from "src/app/shared/models/files/data-url-file.model";
import { isMobileApp } from "src/app/shared/plugins/platform.plugin";

@Component({
  selector: "document-image-upload",
  template: `
    <ion-button *rxLet="docImages(); let images" [id]="id" expand="block" fill="outline">
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

        <ion-content *rxLet="docImages(); let images" class="ion-padding">
          <if [condition]="images.length === 0">
            <p show class="text-center">
              Use camera and gallery buttons to add images
            </p>

            <ion-grid else>
              <ion-row>
                <ion-col *rxFor="let img of images" size="6" sizeMd="4" sizeLg="3">
                  <ion-fab vertical="top" horizontal="end">
                    <ion-fab-button (click)="remove(img.Id)" size="small" color="danger">
                      <ion-icon name="close-outline" />
                    </ion-fab-button>
                  </ion-fab>

                  <ion-img [src]="img.Base64" />
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
                <upload (uploadFiles)="uploads($event)" accept="image/*" [multiple]="true" />
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
export class DocumentImageUploadComponent {
  imgStore = useDocumentImageStore();
  uploadDocument = useUploadDocument();
  uploadDocImages = useUploadDocumentImages();

  id = crypto.randomUUID();
  isMobileApp = isMobileApp();

  @Input({ required: true })
  documentId!: number;

  docImages = this.imgStore.data(imgs => imgs.filter(img => img.DocumentId === this.documentId));

  effects = [
    combineLatest({
      images: this.docImages(),
      response: this.uploadDocument.data()
    }).pipe(
      takeUntilDestroyed(),
      map(({ images, response }) => images.map((img, idx) => 
        ({
          documentId: response.submissionId,
          base64: img.Base64,
          imageNo: idx + 1
        })
      )),
      tap(imgs => this.uploadDocImages.send(imgs))
    )
    .subscribe()
  ]

  addPhoto(photo: Photo) {
    this.imgStore.update(
      addEntities({
        Id: new Date().toISOString(),
        DocumentId: this.documentId,
        Base64: photo.base64String as string,
      })
    );
  }

  uploads(files: DataUrlFile[]) {
    const imgs: SiteDocumentImage[] = files.map((file, idx) => ({
      Id: new Date().toISOString() + idx,
      DocumentId: this.documentId,
      Base64: file.dataUrl
    }));

    this.imgStore.update(
      addEntities(imgs)
    );
  }

  remove(id: string) {
    this.imgStore.update(
      deleteEntities(id)
    );
  }
}
