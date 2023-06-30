import { Directive, HostListener } from "@angular/core";
import { useElement, useParentElement } from "../../angular/element";
import { Subject, debounceTime, map } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Directive({
  selector: "[resizable]",
  standalone: true
})
export class ResizeDirective {
  resize$ = new Subject<void>();

  element = useElement<HTMLCanvasElement>();
  parentElement = useParentElement();

  width = this.resize$.pipe(
    takeUntilDestroyed(),
    debounceTime(300),
    map(() => this.parentElement.offsetWidth - 2)
  )
  .subscribe(width => this.element.width = width);

  height = this.resize$.pipe(
    takeUntilDestroyed(),
    debounceTime(300),
    map(() => this.parentElement.offsetHeight - 2)
  )
  .subscribe(height => this.element.height = height);

  ngOnInit() {
    this.resize$.next();
  }

  @HostListener("window:resize")
  windowResize() {
    this.resize$.next();
  }
}
