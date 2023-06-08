import { Directive, EventEmitter, HostListener, Output } from "@angular/core";
import { Camera, CameraResultType, Photo } from "@capacitor/camera";

@Directive({
  selector: "[takePhoto]",
  standalone: true
})
export class TakePhotoDirective {
  @Output("takePhoto")
  takePhoto = new EventEmitter<Photo>();

  @HostListener("click")
  async take() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64
    });
    this.takePhoto.emit(photo);
  }
}
