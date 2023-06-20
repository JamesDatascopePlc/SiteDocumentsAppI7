import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { DateDirective } from "../../directives/date/date.directive";
import { UtcDatePipe, UtcDateTimePipe } from "../../pipes";
import { RxIf } from "@rx-angular/template/if";
import { AngularComponent, withOnChanges, withOnInit } from "../../lifecycles";
import { Observable, Subscription, filter, map, merge, shareReplay, switchMap, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PushPipe } from "@rx-angular/template/push";

@Component({
  selector: "datetime-picker",
  template: `
    <ion-item [id]="id" button>
      <ion-label *rxIf="presentation === 'date'">{{ datetime$ | push | utcDate }}</ion-label>
      <ion-label *rxIf="presentation !== 'date'">{{ datetime$ | push | utcDateTime }}</ion-label>
    </ion-item>

    <ion-popover [trigger]="id" triggerAction="click" size="auto">
      <ng-template>
        <ion-content>
          <ion-datetime
            [isDateEnabled]="isDateEnabled.bind(this)"
            [date]="datetime$ | push" 
            (dateChange)="datetime = $event; datetimeChange.emit($event)" 
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
    PushPipe,
    UtcDatePipe,
    UtcDateTimePipe,
    DateDirective
  ]
})
export class DatetimePickerComponent extends AngularComponent(withOnInit, withOnChanges) {
  id = crypto.randomUUID();

  @Input()
  datetime: Nullable<Date> = new Date();

  @Output()
  datetimeChange = new EventEmitter<Date>();
  datetimeChangeEffect: Subscription = merge(this.init(), this.input("datetime")).pipe(
    takeUntilDestroyed(),
    filter(() => this.datetime == null),
    switchMap(() => this.datetime$),
    tap(date => this.datetimeChange.emit(date))
  )
  .subscribe();

  datetime$: Observable<Date> = merge(this.init(), this.input("datetime"), this.datetimeChange).pipe(
    map(() => this.datetime || new Date()),
    shareReplay()
  );

  @Input()
  presentation: "date" | "date-time" = "date-time";

  @Input()
  min: Date | null | undefined;

  @Input()
  max: Date | null | undefined;

  isDateEnabled(dateStr: string) {
    const date = new Date(dateStr);

    if (this.min != null && this.max != null)
      return date.isEqualOrAfter(this.min) && date.isEqualOrBefore(this.max);

    if (this.min != null)
      return date.isEqualOrAfter(this.min);

    if (this.max != null)
      return date.isEqualOrBefore(this.max);

    return true;
  }
}