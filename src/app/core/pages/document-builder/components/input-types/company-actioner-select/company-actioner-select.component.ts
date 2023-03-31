import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SelectableComponent } from "src/app/shared/components/selectable/selectable.component";

@Component({
  selector: "company-actioner-select",
  template: `
    <ion-list>
      <ion-item>
        <ion-label>Actioners<span class="required">*</span></ion-label>
        <selectable></selectable>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule, 
    SelectableComponent
  ]
})
export class CompanyActionerSelectComponent {
}
