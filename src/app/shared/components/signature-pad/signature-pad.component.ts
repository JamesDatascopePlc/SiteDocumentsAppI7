import { ChangeDetectionStrategy, Component, Directive, ElementRef, EventEmitter, Input, Output, inject } from "@angular/core";
import { debounceTime, map, merge, switchMap, tap } from "rxjs";
import SignaturePad, { PointGroup } from "signature_pad";
import { AngularComponent, withAfterViewInit } from "../../lifecycles";
import { PushPipe } from "@rx-angular/template/push";
import { use } from "../../rxjs/use";
import { reaction } from "../../reactions";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Directive({
  selector: "canvas[signature-pad]",
  standalone: true
})
export class SignaturePadDirective {
  elementRef: ElementRef<HTMLCanvasElement> = inject(ElementRef);

  signaturePad = new SignaturePad(this.elementRef.nativeElement, {
    minWidth: 2,
    maxWidth: 5,
    backgroundColor: "rgb(255,255,255)"
  });

  @Input()
  points: PointGroup[] = [];

  @Output()
  pointsChange = new EventEmitter<PointGroup[]>();

  @Output()
  padInit = new EventEmitter<SignaturePad>();

  ngOnInit() {
    this.signaturePad.fromData(this.points);
    this.signaturePad.addEventListener("endStroke", () => {
      this.points = this.signaturePad.toData();
      this.pointsChange.emit(this.points);
    });
    this.padInit.emit(this.signaturePad);
  }
}

@Component({
  selector: "signature-pad",
  template: `
    <canvas 
      signature-pad 
      [(points)]="points"
      (pointsChange)="pointsChange.emit(points)"
      class="border border-black bg-white" 
      (padInit)="signaturePad.next($event); padInit.emit(this)"
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
  elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  parentElement<TKey extends keyof HTMLElement>(prop: TKey): HTMLElement[TKey] {
    return this.elementRef.nativeElement.parentElement![prop];
  }

  @Input()
  points: PointGroup[] = [];

  @Output()
  pointsChange = new EventEmitter<PointGroup[]>();

  @Output()
  padInit = new EventEmitter<SignaturePadComponent>();

  @Output()
  save = new EventEmitter<{ points: PointGroup[], dataUrl: string }>();

  signaturePad = use<SignaturePad>();
  resize = use();

  width$ = merge(this.afterViewInit(), this.resize()).pipe(
    debounceTime(300),
    map(() => this.parentElement("offsetWidth") - 2)
  );

  height$ = merge(this.afterViewInit(), this.resize()).pipe(
    debounceTime(300),
    map(() => this.parentElement("offsetHeight") - 2)
  );

  output = reaction($event => $event(
    takeUntilDestroyed(),
    switchMap(() => this.signaturePad()),
    tap(pad => this.save.emit({ points: pad.toData(), dataUrl: pad.toDataURL() }))
  ))

  clear = reaction($event => $event(
    takeUntilDestroyed(),
    switchMap(() => this.signaturePad()),
    tap(pad => pad.clear()),
  ));
}