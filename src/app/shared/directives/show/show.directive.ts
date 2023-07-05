import { Directive, Input } from "@angular/core";
import { useElement } from "../../angular/element";
import { AngularDirective, withAfterViewInit, withOnChanges } from "../../lifecycles";
import { merge } from "rxjs";

@Directive({
  selector: "[show]",
  standalone: true
})
export class ShowDirective extends AngularDirective(withAfterViewInit, withOnChanges) {
  element = useElement();
  
  @Input()
  show!: boolean;

  effects = [
    merge(this.afterViewInit(), this.input("show")).subscribe(() => this.show 
      ? this.element.classList.remove("hidden") 
      : this.element.classList.add("hidden")
    )
  ]
}
