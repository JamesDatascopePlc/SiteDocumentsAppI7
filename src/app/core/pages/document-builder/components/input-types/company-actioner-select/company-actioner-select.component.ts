import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { useCompanies } from "src/app/core/http/login.api";
import { SelectableComponent } from "src/app/shared/components/selectable/selectable.component";
import { importRxTemplate } from "src/app/shared/imports";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";

@Component({
  selector: "company-actioner-select",
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title class="text-center">{{ title || "Company Actioners" }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <selectable 
            [title]="title || 'Company Actioners'" 
            placeholder="Actioners" 
            [items]="companies.data() | push"
            [value]="companyId"
            (valueChange)="companyChange($event)"
            itemValue="Id"
            itemText="Name"
            [canClear]="false" />
        </ion-list>
      </ion-card-content>
    </ion-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule, 
    ...importRxTemplate(),
    SelectableComponent
  ]
})
export class CompanyActionerSelectComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  companies = useCompanies();

  @Input()
  title?: string;

  @Input()
  companyId?: number;

  @Output()
  companyIdChange = new EventEmitter<number>();

  companyChange(companyId: number) {
    this.companyId = companyId;
    this.companyIdChange.emit(this.companyId);
  }
}
