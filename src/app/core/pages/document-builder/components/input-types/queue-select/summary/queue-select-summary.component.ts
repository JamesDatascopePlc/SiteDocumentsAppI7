import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Queue } from "src/app/core/stores/site-document/models/site-document.model";

@Component({
  selector: "queue-select-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b>Queue</b>
          <p>{{ queue?.Name }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class QueueSelectSummaryComponent {
  @Input()
  queues: Queue[] = []

  @Input({ required: true })
  queueId!: number;

  queue = this.queues.find(q => q.Id === this.queueId);
}
