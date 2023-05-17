import { ChangeDetectionStrategy, Component, Directive, ElementRef, inject } from "@angular/core";
import { debounceTime, map, merge } from "rxjs";
import SignaturePad from "signature_pad";
import { AngularComponent, withAfterViewInit } from "../../lifecycles";
import { PushPipe } from "@rx-angular/template/push";
import { subject } from "../../rxjs/subject";

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
}

@Component({
  selector: "signature-pad",
  template: `
    <canvas 
      signature-pad 
      class="border border-black" 
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

  resize$ = subject();

  width$ = merge(this.afterViewInit$(), this.resize$()).pipe(
    debounceTime(300),
    map(() => this.parentElement("offsetWidth") - 2)
  );

  height$ = merge(this.afterViewInit$(), this.resize$()).pipe(
    debounceTime(300),
    map(() => this.parentElement("offsetHeight") - 2)
  );
}