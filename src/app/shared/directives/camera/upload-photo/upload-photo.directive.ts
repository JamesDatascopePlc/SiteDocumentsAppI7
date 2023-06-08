import { Directive, EventEmitter, HostListener, Output } from "@angular/core";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";

@Directive({
  selector: "[uploadPhoto]",
  standalone: true
})
export class UploadPhotoDirective {
  @Output("uploadPhoto")
  uploadPhoto = new EventEmitter<Photo>();

  @HostListener("click")
  async upload() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });
    
    this.uploadPhoto.emit(photo);
  }
}
