import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "site-banner",
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title></ion-card-title>
      </ion-card-header>
    </ion-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class SiteBannerComponent {}
