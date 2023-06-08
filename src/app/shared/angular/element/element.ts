import { ElementRef, inject } from "@angular/core";

export function useElement<T = HTMLElement>() {
  const elementRef = inject(ElementRef);

  return elementRef.nativeElement as T;
}