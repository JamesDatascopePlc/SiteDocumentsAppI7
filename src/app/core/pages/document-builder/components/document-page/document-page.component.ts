import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Page } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "document-page[page]",
  template: `
    <ion-item *rxIf="page.PageTitle.length > 0" lines="none">
      <ion-label>{{ page.PageTitle }}</ion-label>
    </ion-item>
    <ng-content></ng-content>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class DocumentPageComponent {
  @Input()
  page!: Page;
}
