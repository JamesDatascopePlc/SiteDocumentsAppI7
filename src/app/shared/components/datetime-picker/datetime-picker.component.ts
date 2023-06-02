import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { DateDirective } from "../../directives/date/date.directive";
import { UtcDatePipe, UtcDateTimePipe } from "../../pipes";
import { RxIf } from "@rx-angular/template/if";
import { AngularComponent, withAfterViewInit, withOnChanges } from "../../lifecycles";
import { isEqualOrAfter, isEqualOrBefore } from "../../utils/date.fns";

@Component({
  selector: "datetime-picker",
  template: `
    <ion-item [id]="id" button>
      <ion-label *rxIf="presentation === 'date'">{{ datetime | utcDate }}</ion-label>
      <ion-label *rxIf="presentation !== 'date'">{{ datetime | utcDateTime }}</ion-label>
    </ion-item>

    <ion-popover [trigger]="id" triggerAction="click" size="auto">
      <ng-template>
        <ion-content>
          <ion-datetime
            [isDateEnabled]="isDateEnabled.bind(this)"
            [(date)]="datetime" 
            (ionChange)="datetimeChange.emit(datetime)" 
            [presentation]="presentation" />
        </ion-content>
      </ng-template>
    </ion-popover>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    RxIf,
    UtcDatePipe,
    UtcDateTimePipe,
    DateDirective
  ]
})
export class DatetimePickerComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  id = crypto.randomUUID();

  @Input()
  datetime = new Date();

  @Output()
  datetimeChange = new EventEmitter<Date>();

  @Input()
  presentation: "date" | "date-time" = "date-time";

  @Input()
  min: Date | null | undefined;

  @Input()
  max: Date | null | undefined;

  isDateEnabled(dateStr: string) {
    const date = new Date(dateStr);

    if (this.min != null && this.max != null)
      return isEqualOrAfter(date, this.min) && isEqualOrBefore(date, this.max);

    if (this.min != null)
      return isEqualOrAfter(date, this.min);

    if (this.max != null)
      return isEqualOrBefore(date, this.max);

    return true;
  }
}
