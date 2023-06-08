import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { PushPipe } from "@rx-angular/template/push";
import { AngularComponent, withAfterViewInit, withOnChanges } from "../../lifecycles";
import { Observable, map, merge } from "rxjs";

@Component({
  selector: "time-picker",
  styles: [`
    :host { display: contents }

    input[type="time"] {
      width: 100%;
      padding: 0 6px;
      border: 0px;
      background-color:rgba(0, 0, 0, 0);
      -webkit-appearance: none;
    }
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
    map(() => this.time.toFormat("HH:mm"))
  );

  @Output()
  timeChange = new EventEmitter<Date>();
  
  change(value: string) {
    this.time = Date.parseFormat(value, "HH:mm");
    this.timeChange.emit(this.time);
  }
}
