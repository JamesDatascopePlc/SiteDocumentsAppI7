import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { IonicModule } from "@ionic/angular";
import { Observable, map, merge, switchMap } from "rxjs";
import { Company, UserStore } from "src/app/core/stores/user/user.store";
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
            [items]="companies$ | push"
            [value]="selectedCompany$ | push"
            (valueChange)="companyChange($event)"
            itemText="Text"
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
  userStore = inject(UserStore);

  companies$ = this.userStore.companies$;

  @Input()
  title?: string;

  @Input()
  companyId?: number;

  @Output()
  companyIdChange = new EventEmitter<number>();

  selectedCompany$: Observable<Company | null> = merge(this.afterViewInit$(), this.input$("companyId")).pipe(
    takeUntilDestroyed(),
    switchMap(() => this.companies$),
    map(companies => companies.find(c => c.Id === this.companyId) || null)
  );

  companyChange(company: Company | null) {
    this.companyId = company!.Id;
    this.companyIdChange.emit(this.companyId);
  }
}
