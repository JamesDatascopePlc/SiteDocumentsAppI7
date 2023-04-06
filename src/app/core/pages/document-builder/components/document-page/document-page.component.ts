import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Page } from "src/app/core/stores/site-document/models";

@Component({
  selector: "document-page[page]",
  template: `
    <ion-item lines="none">
      <ion-label>{{ page.PageTitle }}</ion-label>
    </ion-item>
    <ng-content></ng-content>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class DocumentPageComponent {
  @Input()
  page!: Page;
}
