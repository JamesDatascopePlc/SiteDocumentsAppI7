import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { useOperativeStore } from "src/app/core/stores/operative/operatives.store";
import { importRxTemplate } from "src/app/shared/imports";
import { OperativeListModal } from "src/app/shared/modals/operative-list/operative-list.modal";
import { FindPipe } from "src/app/shared/pipes";

@Component({
  selector: "actioner-select",
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title class="text-center">{{ title || "To Action / Attention Of" }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item [id]="id" button>
            <ion-label 
              *rxLet="operativeStore.data() 
              | find: { 'ID': actionerId }; let actioner" 
              class="ion-text-wrap">
                {{ actioner?.Name || "Select an Actioner" }}
              </ion-label>
            <ion-icon name="person-outline" slot="start" />
            <operative-list-modal [trigger]="id" (select)="actionerId = $event.ID; actionerIdChange.emit($event.ID)" />
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    OperativeListModal,
    FindPipe
  ]
})
export class ActionerSelectComponent {
  operativeStore = useOperativeStore();

  id = crypto.randomUUID();

  @Input()
  title?: string;

  @Input()
  hideMyself: boolean = false;

  @Input()
  actionerId?: number;

  @Output()
  actionerIdChange = new EventEmitter<number>();
}