import { Directive, HostListener } from "@angular/core";
import { useElement } from "../../angular/element";
import { Subject, debounceTime, map } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { memoize } from "lodash-es";

@Directive({
  selector: "canvas[resize]",
  standalone: true
})
export class CanvasResize {
  resize$ = new Subject<void>();

  element = useElement<HTMLCanvasElement>();
  parentElement = memoize(() => this.element.parentElement!);

  width = this.resize$.pipe(
    takeUntilDestroyed(),
    debounceTime(300),
    map(() => this.parentElement().offsetWidth - 2)
  )
  .subscribe(width => {
    console.log("width:" + width);
    this.element.width = width;
  });

  height = this.resize$.pipe(
    takeUntilDestroyed(),
    debounceTime(300),
    map(() => this.parentElement().offsetHeight - 2)
  )
  .subscribe(height => {
    console.log("height:" + height);
    this.element.height = height;
  });

  ngAfterViewInit() {
    this.resize$.next();
  }

  @HostListener("window:resize")
  windowResize() {
    this.resize$.next();
  }
}
