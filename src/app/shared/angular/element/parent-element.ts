import { ElementRef, inject } from "@angular/core";

export function useParentElement<T = HTMLElement>() {
  const elementRef = inject(ElementRef);

  return elementRef.nativeElement.parentElement as T;
}