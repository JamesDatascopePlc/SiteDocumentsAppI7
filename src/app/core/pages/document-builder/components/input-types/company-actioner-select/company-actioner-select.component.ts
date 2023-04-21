import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SelectableComponent } from "src/app/shared/components/selectable/selectable.component";

@Component({
  selector: "company-actioner-select",
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title class="text-center">{{ title }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <selectable 
            [title]="title" 
            placeholder="Actioners" 
            [canClear]="false">
          </selectable>
        </ion-list>
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
export class CompanyActionerSelectComponent {
  @Input()
  title: string = "Company Actioners";
}
