import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output } from "@angular/core";
import { formatISO, parseISO } from "date-fns";

@Directive({
  selector: "[date]",
  standalone: true
})
export class DateDirective {
  protected element: Element & { value: string } = inject(ElementRef).nativeElement;
  
  @Input("date")
  date!: Date;
  
  @Output()
  dateChange = new EventEmitter<Date>();

  
  ngOnChanges() {
    this.element.value = formatISO(this.date);
  }

  @HostListener("change")
  @HostListener("ionChange")
  change() {
    this.date = parseISO(this.element.value);
    this.dateChange.emit(this.date);
  }
}
