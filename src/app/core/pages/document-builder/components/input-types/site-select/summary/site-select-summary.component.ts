import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { useSites } from "src/app/core/http/login.api";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "site-select-summary",
  template: `
    <ion-item lines="none">
      <ion-label>
        <h3>{{ title || "Site" }}</h3>
        <p *rxIf="site(); let site">{{ site.Name }}</p>
      </ion-label>
    </ion-item>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class SiteSelectSummaryComponent {
  sites = useSites();

  @Input()
  title?: string;

  @Input({ required: true })
  siteId!: number;

  site = this.sites.data(sites => sites.find(s => s.Id === this.siteId));
}
