import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "queue-duration",
  template: `
    <ion-label class="text-lg">Queue Duration</ion-label>
    
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-input label="Duration" labelPlacement="floating" type="number" min="0"></ion-input>
        </ion-col>
        <ion-col>
          <ion-select label="Type" labelPlacement="floating">
            <ion-select-option value="Mins">Minutes</ion-select-option>
            <ion-select-option value="Hours">Hours</ion-select-option>
            <ion-select-option value="Days">Days</ion-select-option>
          </ion-select>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class QueueDurationComponent {
}
