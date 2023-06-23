import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { useCompanies } from "src/app/core/http/login.api";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "company-actioner-select-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b>{{ title || "Company Actioners" }}</b>
          <p *rxIf="company(); let company">{{ company.Name }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class CompanyActionerSelectSummaryComponent {
  companies = useCompanies();

  @Input()
  title?: string;

  @Input({ required: true })
  companyId!: number;

  company = this.companies.data(companies => companies.find(c => c.Id === this.companyId))
}
