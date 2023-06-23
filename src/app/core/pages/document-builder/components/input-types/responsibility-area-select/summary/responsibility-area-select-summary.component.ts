import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { useResAreaTypes } from "src/app/core/http/login.api";
import { SiteDocument } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "responsibility-area-select-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b *rxIf="resAreaType(); let rat">{{ rat.AppQuestionText }}</b>
          <p *rxIf="resArea(); let area">{{ area.Name }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class ResponsibilityAreaSelectSummaryComponent {
  resAreasTypes = useResAreaTypes();
  
  @Input({ required: true })
  document!: SiteDocument;

  resAreaType = this.resAreasTypes.find(at => at.Id === this.document.DocumentResponsibilityAreaTypeId);
  resArea = this.resAreasTypes.areas(areas => areas.find(a => a.Id === this.document.DocumentResponsibilityAreaId));
}
