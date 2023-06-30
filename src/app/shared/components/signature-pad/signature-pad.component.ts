import { ChangeDetectionStrategy, Component, Directive, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import SignaturePad, { PointGroup } from "signature_pad";
import { AngularComponent, withAfterViewInit } from "../../lifecycles";
import { PushPipe } from "@rx-angular/template/push";
import { useElement } from "../../angular/element";
import { CanvasResize } from "../../directives";

@Directive({
  selector: "canvas[signature-pad]",
  standalone: true
})
export class SignaturePadDirective {
  element = useElement<HTMLCanvasElement>();

  signaturePad = new SignaturePad(this.element, {
    minWidth: 2,
    maxWidth: 5,
    backgroundColor: "rgb(255,255,255)"
  });

  @Input()
  points?: PointGroup[] = [];

  @Output()
  pointsChange = new EventEmitter<PointGroup[]>();

  ngOnInit() {
    this.signaturePad.fromData(this.points || []);
  }

  dataPoints() {
    return this.signaturePad.toData();
  }

  toDataUrl() {
    return this.signaturePad.toDataURL();
  }

  clear() {
    this.signaturePad.clear();
  }
}

@Component({
  selector: "signature-pad",
  template: `
    <canvas 
      signature-pad 
      resize
      [points]="points"
      class="border border-black bg-white">
    </canvas>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PushPipe, SignaturePadDirective, CanvasResize]
})
export class SignaturePadComponent extends AngularComponent(withAfterViewInit) {
  @ViewChild(SignaturePadDirective)
  signatureDirective?: SignaturePadDirective;

  @Input()
  points?: PointGroup[] = [];

  dataPoints() {
    return this.signatureDirective?.dataPoints();
  }

  toDataUrl() {
    return this.signatureDirective?.toDataUrl();
  }

  clear() {
    this.signatureDirective?.clear();
  }
}