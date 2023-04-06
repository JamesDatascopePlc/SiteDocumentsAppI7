import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "child-document-card[document]",
  template: `
    <ion-list>
      <ion-list-header>Action Document</ion-list-header>
      <ion-item lines="none">
        <ion-label class="ion-text-wrap">
          
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
}
