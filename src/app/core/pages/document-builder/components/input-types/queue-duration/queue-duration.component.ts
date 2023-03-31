import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "queue-duration",
  template: `
    <h3 class="ion-no-margin">Queue Duration</h3>
    
    <ion-list class="ion-padding-horizontal">
      <ion-item>
        <ion-input label="Duration" labelPlacement="floating" type="number" min="0"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Type</ion-label>
        <ion-select>
          <ion-select-option value="Mins">Minutes</ion-select-option>
          <ion-select-option value="Hours">Hours</ion-select-option>
          <ion-select-option value="Days">Days</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class QueueDurationComponent {

}
