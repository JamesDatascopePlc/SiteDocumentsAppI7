import { Directive, HostListener } from "@angular/core";
import { useElement } from "../../../angular/element";
import { Subject, Subscription, debounceTime, map } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { memoize } from "lodash-es";

@Directive({
  selector: "canvas",
  standalone: true
})
export class CanvasResizeDirective {
  resize$ = new Subject<void>();

  element = useElement<HTMLCanvasElement>();
  parentElement = memoize(() => this.element.parentElement!);

  ratio = Math.max(window.devicePixelRatio || 1, 1);

  effects: Subscription[] = [
    this.resize$.pipe(
      takeUntilDestroyed(),
      debounceTime(300),
      map(() => (this.parentElement().offsetWidth - 2) * this.ratio)
    )
    .subscribe(width => {
      this.element.width = width;
    }),
  
    this.resize$.pipe(
      takeUntilDestroyed(),
      debounceTime(300),
      map(() => (this.parentElement().offsetHeight - 2) * this.ratio)
    )
    .subscribe(height => {
      this.element.height = height;
    }),

    this.resize$.pipe(
      takeUntilDestroyed(),
      debounceTime(300)
    )
    .subscribe(() => this.element
      .getContext("2d")
      ?.scale(this.ratio, this.ratio)
    )
  ]

  ngAfterViewInit() {
    this.resize$.next();
  }

  @HostListener("window:resize")
  windowResize() {
    this.resize$.next();
  }
}
