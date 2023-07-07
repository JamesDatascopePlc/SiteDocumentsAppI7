import { Directive } from "@angular/core";
import { useElement } from "../../angular/element";
import Moveable from "moveable";

@Directive({
  selector: "[moveable]",
  standalone: true
})
export class MoveableDirective {
  element = useElement();

  moveable?: Moveable;

  ngAfterViewInit() {
    this.moveable = new Moveable(this.element.parentElement!, {
      target: this.element,
      draggable: true,
      keepRatio: true,
      origin: false,
      useResizeObserver: true,
      useMutationObserver: true
    });

    this.moveable.on("drag", ({ left, top }) => {
      this.element.style.left = `${left}px`;
      this.element.style.top = `${top}px`;
    });

    this.moveable.on("click", ({ inputTarget }) => {
      (inputTarget as HTMLElement).focus();
    });
  }

  ngOnDestroy() {
    this.moveable?.destroy();
  }
}
