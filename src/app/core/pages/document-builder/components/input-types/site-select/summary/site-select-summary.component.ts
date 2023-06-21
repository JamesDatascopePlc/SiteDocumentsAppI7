import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SiteDocument } from "src/app/core/stores/site-document/models";

@Component({
  selector: "queue-select-summary",
  template: `
    <ion-item *rxIf="queue != null" lines="none">
      <ion-label>
        <b>Queue</b>
        <p>{{ queue!.Value }}</p>
      </ion-label>
    </ion-item>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class SiteSelectSummaryComponent {
  @Input({ required: true })
  document!: SiteDocument;

  queue = this.document.Queues.find(q => q.Key === this.document.AutoQueueID?.toString());
}
