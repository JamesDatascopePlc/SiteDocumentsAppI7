import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { IonicModule } from "@ionic/angular";
import { Observable, merge, switchMap } from "rxjs";
import { ResponsibilityAreaType, ResponsibilityAreaTypesStore } from "src/app/core/stores/responsibility-area-types/responsibility-area-types.store";
import { IfComponent, SelectableComponent } from "src/app/shared/components";
import { importRxTemplate } from "src/app/shared/imports";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";

@Component({
  selector: "responsibility-area-select[resposibilityTypeId]",
  template: `
    <ion-card *rxLet="responsibilityAreaType$; let rat">
      <ion-card-header *rxIf="rat != null">
        <ion-card-title class="text-center">
          {{ rat.AppQuestionText }}
        </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <if [condition]="rat != null && rat.Areas.length > 0">
          <selectable 
            show 
            title="Responsibility Types"
            placeholder="Select"
            [items]="rat?.Areas || []"
            itemText="Name"
            (valueChange)="responsibilityAreaTypeIdChange.emit($event!.Id)"
            [canClear]="false" />
          <span else>
            No areas found For Document Responsibility Area Type. 
            Document will not be able to be submitted. Please update lists and try again.
          </span>
        </if>
      </ion-card-content>
    </ion-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    SelectableComponent,
    IfComponent
  ]
})
export class ResponsibilityAreaSelectComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  responsibilityAreaTypesStore = inject(ResponsibilityAreaTypesStore);

  @Input()
  responsibilityAreaTypeId!: number;

  @Output()
  responsibilityAreaTypeIdChange = new EventEmitter<number>();

  responsibilityAreaType$: Observable<ResponsibilityAreaType | undefined> = merge(this.afterViewInit$(), this.input$("responsibilityAreaTypeId")).pipe(
    takeUntilDestroyed(),
    switchMap(() => this.responsibilityAreaTypesStore.responsibilityAreaTypeById$(this.responsibilityAreaTypeId))
  );
}
