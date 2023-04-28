import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "queue-duration",
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title class="text-center">Queue Duration</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-input [(ngModel)]="duration" (ionChange)="durationChange.emit(duration)" label="Duration" labelPlacement="floating" type="number" min="0"></ion-input>
            </ion-col>
            <ion-col>
              <ion-select [(ngModel)]="type" (ionChange)="typeChange.emit(type)" interface="popover" label="Type" labelPlacement="floating">
                <ion-select-option value="Mins">Minutes</ion-select-option>
                <ion-select-option value="Hours">Hours</ion-select-option>
                <ion-select-option value="Days">Days</ion-select-option>
              </ion-select>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-content>
    </ion-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class QueueDurationComponent {
  @Input()
  duration?: number;

  @Output()
  durationChange = new EventEmitter<number>();

  @Input()
  type: "Mins" | "Hours" | "Days" = "Mins";

  @Output()
  typeChange = new EventEmitter<"Mins" | "Hours" | "Days">();
}
