import { ChangeDetectionStrategy, Component, Directive, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { debounceTime, map, merge } from "rxjs";
import SignaturePad, { PointGroup } from "signature_pad";
import { AngularComponent, withAfterViewInit } from "../../lifecycles";
import { PushPipe } from "@rx-angular/template/push";
import { use } from "../../rxjs/use";
import { useElement, useParentElement } from "../../angular/element";

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
      [points]="points"
      class="border border-black bg-white" 
      (window:resize)="resize.next()"
      [width]="width$ | push"
      [height]="height$ | push">
    </canvas>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PushPipe, SignaturePadDirective]
})
export class SignaturePadComponent extends AngularComponent(withAfterViewInit) {
  @ViewChild(SignaturePadDirective)
  signatureDirective?: SignaturePadDirective;

  @Input()
  points?: PointGroup[] = [];

  parentElement = useParentElement();
  resize = use();

  width$ = merge(this.afterViewInit(), this.resize()).pipe(
    debounceTime(300),
    map(() => this.parentElement.offsetWidth - 2)
  );

  height$ = merge(this.afterViewInit(), this.resize()).pipe(
    debounceTime(300),
    map(() => this.parentElement.offsetHeight - 2)
  );

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