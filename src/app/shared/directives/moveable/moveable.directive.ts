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
    });
    this.moveable.on("drag", ({ transform }) => {
      this.element.style.transform = transform;
    })
    console.log(this.moveable);
  }
}
