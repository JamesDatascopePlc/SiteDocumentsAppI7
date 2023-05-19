import { ChangeDetectionStrategy, Component, Directive, ElementRef, EventEmitter, Output, inject } from "@angular/core";
import { debounceTime, map, merge, switchMap, tap } from "rxjs";
import SignaturePad from "signature_pad";
import { AngularComponent, withAfterViewInit } from "../../lifecycles";
import { PushPipe } from "@rx-angular/template/push";
import { replaySubject, subject } from "../../rxjs/subject";
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

  @Output()
  padInit = new EventEmitter<SignaturePad>();

  ngOnInit() {
    this.padInit.emit(this.signaturePad);
  }
}

@Component({
  selector: "signature-pad",
  template: `
    <canvas 
      signature-pad 
      class="border border-black bg-white" 
      (padInit)="signaturePad$.next($event); padInit.emit(this)"
      (window:resize)="resize$.next()"
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

  signaturePad$ = replaySubject<SignaturePad>();
  resize$ = subject();

  width$ = merge(this.afterViewInit$(), this.resize$()).pipe(
    debounceTime(300),
    map(() => this.parentElement("offsetWidth") - 2)
  );

  height$ = merge(this.afterViewInit$(), this.resize$()).pipe(
    debounceTime(300),
    map(() => this.parentElement("offsetHeight") - 2)
  );

  clear = reaction($event => $event(
    takeUntilDestroyed(),
    switchMap(() => this.signaturePad$()),
    tap(pad => pad.clear()),
  ));

  @Output()
  padInit = new EventEmitter<SignaturePadComponent>();
}