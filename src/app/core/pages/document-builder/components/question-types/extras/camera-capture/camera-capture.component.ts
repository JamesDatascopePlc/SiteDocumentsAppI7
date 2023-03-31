import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Photo } from "@capacitor/camera";
import { IonicModule } from "@ionic/angular";
import { CameraComponent, IfComponent } from "src/app/shared/components";
import { PhotoViewerDirective } from "src/app/shared/directives";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "camera-capture",
  template: `
    <if [condition]="base64Img == null">
      <!-- <ion-button 
        show
        [unpatch]
        [camera]="vm.options$ | push" 
        (takePhoto)="take($event)" 
        fill="clear">
        <ion-icon name="camera-outline" slot="icon-only"></ion-icon>
      </ion-button> -->
      <camera show fill="clear">
        <ion-icon name="camera-outline" slot="icon-only"></ion-icon>
      </camera>

      <ng-container else>
        <ion-button [photo-viewer]="base64Img!" [unpatch] fill="clear">
          <ion-icon name="eye-outline" slot="icon-only"></ion-icon>
        </ion-button>
        <ion-button (click)="remove()" [unpatch] fill="clear" color="danger">
          <ion-icon name="close-outline" slot="icon-only"></ion-icon>
        </ion-button>
      </ng-container>
    </if>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    IfComponent,
    CameraComponent,
    PhotoViewerDirective
  ]
})
export class CameraCaptureComponent {

  @Input()
  base64Img: string | null = null;

  @Output()
  takePhoto = new EventEmitter<Photo>();

  @Output()
  removePhoto = new EventEmitter();

  take(photo: Photo) {
    this.base64Img = photo.base64String || null;
    this.takePhoto.emit(photo);
  }

  remove() {
    this.base64Img = null;
    this.removePhoto.emit();
  }
}
