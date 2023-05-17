import { Directive, ElementRef, HostBinding, inject } from "@angular/core";
import Viewer from "viewerjs";

@Directive({
  selector: "[photo-viewer]",
  standalone: true
})
export class PhotoViewerDirective {
  elementRef = inject(ElementRef);

  @HostBinding("click")
  view() {
    const viewer = new Viewer(this.elementRef.nativeElement, {
      backdrop: true,
      focus: true,
      fullscreen: true,
      loading: true,
      title: true,
      transition: true,
      zoomable: true,
      zoomOnTouch: true,
      zoomOnWheel: true
    });

    viewer.view();
  }
}
