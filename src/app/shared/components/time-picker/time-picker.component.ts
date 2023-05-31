import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { PushPipe } from "@rx-angular/template/push";
import { AngularComponent, withAfterViewInit, withOnChanges } from "../../lifecycles";
import { Observable, map, merge } from "rxjs";
import { format, parse } from "date-fns";

@Component({
  selector: "time-picker",
  styles: [`
    :host { display: contents }
  `],
  template: `
    <input 
      #timeInput 
      type="time" 
      [class]="className"
      [value]="timeValue$ | push" 
      (change)="change(timeInput.value)" />
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PushPipe]
})
export class TimePickerComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  @Input("class")
  className: string = "";
  
  @Input()
  time: Date = new Date();
  
  timeValue$: Observable<string> = merge(this.afterViewInit(), this.input("time")).pipe(
    map(() => format(this.time, "hh:mm"))
  );

  @Output()
  timeChange = new EventEmitter<Date>();
  
  change(value: string) {
    this.time = parse(value, "hh:mm", new Date());
    this.timeChange.emit(this.time);
  }
}
