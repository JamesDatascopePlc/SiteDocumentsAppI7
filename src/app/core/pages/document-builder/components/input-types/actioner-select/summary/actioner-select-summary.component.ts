import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { useOperativeStore } from "src/app/core/stores/operative/operatives.store";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "actioner-select-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b>{{ title || "To Action / Attention Of" }}</b>
          <p *rxIf="operative(); let operative">{{ operative.Name }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class ActionerSelectSummaryComponent {
  operativeStore = useOperativeStore();

  @Input()
  title?: string;

  @Input({ required: true })
  actionerId!: number;

  operative = this.operativeStore.data(operatives => operatives.find(o => o.ID === this.actionerId));
}
