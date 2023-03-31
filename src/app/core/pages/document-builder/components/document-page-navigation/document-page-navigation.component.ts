import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "document-page-navigation",
  template: `
    <ion-button class="float-left">Back</ion-button>
    <ion-button class="float-right">Next</ion-button>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class DocumentPageNavigationComponent {}
