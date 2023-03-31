import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SelectableComponent } from "src/app/shared/components";

@Component({
  selector: "site-select",
  template: `
    <ion-card>
      <ion-card-header>
        
      </ion-card-header>
      <ion-card-content>
        <ion-item lines="none">
          <selectable></selectable>
        </ion-item>
      </ion-card-content>
    </ion-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    SelectableComponent
  ]
})
export class SiteSelectComponent {
}
