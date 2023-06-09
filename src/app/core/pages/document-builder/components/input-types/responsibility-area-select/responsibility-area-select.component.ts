import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { useResAreaTypes } from "src/app/core/http/login.api";
import { IfComponent, SelectableComponent } from "src/app/shared/components";
import { importRxTemplate } from "src/app/shared/imports";
import { FindPipe } from "src/app/shared/pipes";

@Component({
  selector: "responsibility-area-select",
  template: `
    <ion-card *rxLet="resAreasTypes.data() | find: { 'Id': responsibilityAreaTypeId }; let rat">
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
            [items]="resAreasTypes.areas() | push"
            [(value)]="responsibilityAreaTypeId"
            itemValue="DocResAreaTypeId"
            itemText="Name"
            (valueChange)="responsibilityAreaIdChange.emit(responsibilityAreaTypeId)"
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
    IfComponent,
    FindPipe
  ]
})
export class ResponsibilityAreaSelectComponent {
  resAreasTypes = useResAreaTypes();
  
  @Input({ required: true })
  responsibilityAreaTypeId!: number;

  @Input()
  responsibilityAreaId?: number;

  @Output()
  responsibilityAreaIdChange = new EventEmitter<number>();
}
