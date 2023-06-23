import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { QueueDuration } from "src/app/core/stores/site-document/models/site-document.model";

@Component({
  selector: "queue-duration-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b>Queue Duration</b>
          <p>{{ duration.Value }} ({{ duration.Type }})</p>
        </ion-label>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class QueueDurationSummaryComponent {
  @Input({ required: true })
  duration!: QueueDuration;
}
