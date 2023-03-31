import { Directive, HostBinding, Input } from "@angular/core";
import { PhotoViewer } from "@capacitor-community/photoviewer";

@Directive({
  selector: "[photo-viewer]",
  standalone: true
})
export class PhotoViewerDirective {
  @Input("photo-viewer")
  url!: string;

  @HostBinding("click")
  view() {
    PhotoViewer.show({
      images: [{ url: this.url }]
    });
  }
}
