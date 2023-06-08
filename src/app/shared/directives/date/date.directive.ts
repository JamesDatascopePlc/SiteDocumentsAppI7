import { Directive, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { useElement } from "../../angular/element";

@Directive({
  selector: "[date]",
  standalone: true
})
export class DateDirective {
  protected element: Element & { value: string } = useElement();
  
  @Input("date")
  date!: Date;
  
  @Output()
  dateChange = new EventEmitter<Date>();
  
  ngOnChanges() {
    this.element.value = this.date.toISOString();
  }

  @HostListener("change")
  @HostListener("ionChange")
  change() {
    this.date = Date.fromISOString(this.element.value);
    this.dateChange.emit(this.date);
  }
}
