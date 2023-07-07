import { ChangeDetectionStrategy, Component, Directive, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import SignaturePad, { PointGroup } from "signature_pad";
import { AngularComponent, AngularDirective, withAfterViewInit, withOnChanges, withOnDestroy, withOnInit } from "../../lifecycles";
import { PushPipe } from "@rx-angular/template/push";
import { useElement } from "../../angular/element";
import { CanvasResizeDirective } from "../../directives";
import { Subscription, filter, merge } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Directive({
  selector: "canvas[signature-pad]",
  standalone: true
})
export class SignaturePadDirective extends AngularDirective(withOnInit, withOnChanges, withOnDestroy) {
  element = useElement<HTMLCanvasElement>();

  @Input()
  penColor: string = "#000000";

  @Input()
  minWidth: number = 2

  @Input()
  maxWidth: number = 5

  @Input()
  points?: PointGroup[] = [];

  @Output()
  pointsChange = new EventEmitter<PointGroup[]>();

  @Output()
  beginStroke = new EventEmitter<void>();
  beginStrokeEmit() { 
    this.beginStroke.emit();
  }

  @Output()
  endStroke = new EventEmitter<void>();
  endStrokeEmit() {
    this.endStroke.emit();
  }

  signaturePad = new SignaturePad(this.element, {
    penColor: this.penColor,
    minWidth: this.minWidth,
    maxWidth: this.maxWidth,
    backgroundColor: "rgb(255,255,255)"
  });

  events: Subscription[] = [
    this.init()
      .subscribe(() => this.signaturePad.addEventListener("beginStroke", this.beginStrokeEmit.bind(this))),
    this.destroy()
      .subscribe(() => this.signaturePad.removeEventListener("beginStroke", this.beginStrokeEmit.bind(this))),

      this.init()
      .subscribe(() => this.signaturePad.addEventListener("endStroke", this.endStrokeEmit.bind(this))),
    this.destroy()
      .subscribe(() => this.signaturePad.removeEventListener("endStroke", this.endStrokeEmit.bind(this))),

    this.input("penColor")
      .subscribe(() => this.signaturePad.penColor = this.penColor),
    
    this.input("minWidth")
      .subscribe(() => this.signaturePad.minWidth = this.minWidth),

    this.input("maxWidth")
      .subscribe(() => this.signaturePad.maxWidth = this.maxWidth),
      
    merge(this.init(), this.input("points")).pipe(
      takeUntilDestroyed(),
      filter(() => this.points != null)
    )
    .subscribe(() => this.signaturePad.fromData(this.points!))
  ];

  fromDataUrl(dataUrl: string, options?: {
    ratio?: number;
    width?: number;
    height?: number;
    xOffset?: number;
    yOffset?: number;
  }) {
    return this.signaturePad.fromDataURL(dataUrl, options);
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
  imports: [PushPipe, SignaturePadDirective, CanvasResizeDirective]
})
export class SignaturePadComponent extends AngularComponent(withAfterViewInit) {
  @ViewChild(SignaturePadDirective)
  signatureDirective?: SignaturePadDirective;

  @Input()
  points?: PointGroup[] = [];

  fromDataUrl(dataUrl: string, options?: {
    ratio?: number;
    width?: number;
    height?: number;
    xOffset?: number;
    yOffset?: number;
  }) {
    return this.signatureDirective?.fromDataUrl(dataUrl, options);
  }

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