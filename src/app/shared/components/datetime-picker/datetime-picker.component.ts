import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { IfModule } from "@rx-angular/template/if";
import { UnpatchModule } from "@rx-angular/template/unpatch";
import { DateDirective } from "../../directives/date/date.directive";
import { UtcDatePipe, UtcDateTimePipe } from "../../pipes";

@Component({
  selector: "datetime-picker",
  template: `
    <ion-item [id]="id" [unpatch] button>
      <ion-label *rxIf="presentation === 'date'">{{ datetime | utcDate }}</ion-label>
      <ion-label *rxIf="presentation !== 'date'">{{ datetime | utcDateTime }}</ion-label>
    </ion-item>

    <ion-popover [trigger]="id" triggerAction="click" size="auto">
      <ng-template>
        <ion-content>
          <ion-datetime 
            [(date)]="datetime" 
            (ionChange)="datetimeChange.emit(datetime)" 
            [presentation]="presentation">
          </ion-datetime>
        </ion-content>
      </ng-template>
    </ion-popover>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    FormsModule,
    IfModule,
    UnpatchModule,
    UtcDatePipe,
    UtcDateTimePipe,
    DateDirective
  ]
})
export class DatetimePickerComponent {
  id = crypto.randomUUID();
  
  @Input()
  datetime = new Date();

  @Output()
  datetimeChange = new EventEmitter<Date>();

  @Input()
  presentation: "date" | "date-time" = "date-time";
}
