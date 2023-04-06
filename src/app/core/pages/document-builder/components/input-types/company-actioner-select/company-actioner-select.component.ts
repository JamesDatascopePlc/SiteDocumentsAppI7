import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SelectableComponent } from "src/app/shared/components/selectable/selectable.component";

@Component({
  selector: "company-actioner-select",
  template: `
    <selectable placeholder="Actioners"></selectable>
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
