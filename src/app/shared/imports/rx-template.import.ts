import { LetDirective } from "@rx-angular/template/let";
import { RxFor } from "@rx-angular/template/for"
import { RxIf } from "@rx-angular/template/if";
import { UnpatchDirective } from "@rx-angular/template/unpatch";
import { PushPipe } from "@rx-angular/template/push";
import { FixedSizeVirtualScrollStrategy, RxVirtualFor, RxVirtualScrollViewportComponent } from "@rx-angular/template/experimental/virtual-scrolling";

export function importRxTemplate() {
  return [
    LetDirective,
    RxFor,
    RxIf,
    UnpatchDirective,
    PushPipe
  ]
}

export function importRxFixedVirtualScroll() {
  return [
    FixedSizeVirtualScrollStrategy,
    RxVirtualFor,
    RxVirtualScrollViewportComponent
  ]
}