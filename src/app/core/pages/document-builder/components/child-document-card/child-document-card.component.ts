import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SiteDocument } from "src/app/core/stores/site-document/site-document.store";

@Component({
  selector: "child-document-card[document]",
  template: `
    <ion-list>
      <ion-list-header>Action Document</ion-list-header>
      <ion-item lines="none">
        <ion-label class="ion-text-wrap">
          {{ document.DocumentTitle }}
        </ion-label>
        <ion-button>
          <ion-icon name="pencil-outline" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class ChildDocumentCardComponent {
  @Input()
  document!: SiteDocument;
}
