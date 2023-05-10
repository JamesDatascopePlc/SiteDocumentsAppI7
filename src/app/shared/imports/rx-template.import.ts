import { LetDirective } from "@rx-angular/template/let";
import { RxFor } from "@rx-angular/template/for"
import { RxIf } from "@rx-angular/template/if";
import { UnpatchDirective } from "@rx-angular/template/unpatch";
import { PushPipe } from "@rx-angular/template/push";
import { AutoSizeVirtualScrollStrategy, DynamicSizeVirtualScrollStrategy, FixedSizeVirtualScrollStrategy, RxVirtualFor, RxVirtualScrollViewportComponent } from "@rx-angular/template/experimental/virtual-scrolling";

/** Documentation can be found here: https://www.rx-angular.io/docs/template */
export function importRxTemplate() {
  return [
    LetDirective,
    RxFor,
    RxIf,
    UnpatchDirective,
    PushPipe
  ]
}

export function importRxVirtualScroll(...providers: Array<typeof FixedSizeVirtualScrollStrategy | typeof DynamicSizeVirtualScrollStrategy | typeof AutoSizeVirtualScrollStrategy>) {
  return [
    ...providers,
    RxVirtualFor,
    RxVirtualScrollViewportComponent
  ]
}

/** Visit for more information: https://www.rx-angular.io/docs/template/api/virtual-scrolling#fixedsizevirtualscrollstrategy */
export function importRxFixedVirtualScroll() {
  return [
    FixedSizeVirtualScrollStrategy,
    RxVirtualFor,
    RxVirtualScrollViewportComponent
  ]
}

/** Visit for more information: https://www.rx-angular.io/docs/template/api/virtual-scrolling#dynamicsizevirtualscrollstrategy */
export function importRxDynamicVirtualScroll() {
  return [
    DynamicSizeVirtualScrollStrategy,
    RxVirtualFor,
    RxVirtualScrollViewportComponent
  ]
}

/** Visit for more information: https://www.rx-angular.io/docs/template/api/virtual-scrolling#autosizevirtualscrollstrategy */
export function importRxAutoVirtualScroll() {
  return [
    AutoSizeVirtualScrollStrategy,
    RxVirtualFor,
    RxVirtualScrollViewportComponent
  ]
}