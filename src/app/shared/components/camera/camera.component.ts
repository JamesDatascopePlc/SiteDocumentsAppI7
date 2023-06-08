import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate } from "../../imports";
import { isMobileApp } from "../../plugins/platform.plugin";
import { IfComponent } from "../if/if.component";
import { UploadComponent } from "../upload/upload.component";
import { Camera, CameraResultType, ImageOptions } from "@capacitor/camera";
import { DataUrlFile } from "../../models/files/data-url-file.model";

@Component({
  selector: "camera",
  template: `
    <ion-button [fill]="fill" [expand]="expand" [color]="color">
      <if [condition]="isMobileApp">
        <div show (click)="take()"></div>
        <upload else (uploadFiles)="upload($event)" accept="image/*" />
      </if>
      <ng-content></ng-content>
    </ion-button>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule, 
    ...importRxTemplate(),
    IfComponent,
    UploadComponent
  ]
})
export class CameraComponent {
  @Input()
  fill?: "clear" | "outline" | "solid";

  @Input()
  expand?: "block" | "full";

  @Input()
  color?: string;

  @Output()
  takePhoto = new EventEmitter<string>();
  
  isMobileApp = isMobileApp();

  @Input()
  options: ImageOptions = {
    resultType: CameraResultType.Base64
  };

  async take() {
    const photo = await Camera.getPhoto(this.options);
    
    this.takePhoto.emit(photo.base64String);
  }

  upload(files: DataUrlFile[]) {
    if (files[0] != null)
      this.takePhoto.emit(files[0].dataUrl);
  }
}
