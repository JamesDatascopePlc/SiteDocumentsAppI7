import { Directive, EventEmitter, HostBinding, Input, Output } from "@angular/core";
import { Camera, ImageOptions } from "@capacitor/camera";
import { CameraResultType, Photo } from "@capacitor/camera/dist/esm/definitions";

@Directive({
  selector: "[camera]",
  standalone: true
})
export class CameraDirective {
  @Input("camera")
  options: ImageOptions = {
    resultType: CameraResultType.Base64
  };

  @Output()
  takePhoto = new EventEmitter<Photo>();

  @HostBinding("click")
  async take() {
    const photo = await Camera.getPhoto(this.options);
    this.takePhoto.emit(photo);
  }
}
