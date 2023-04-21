import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Operative } from "src/app/core/stores/operative/operatives.store";
import { OperativeListModal } from "src/app/shared/modals/operative-list/operative-list.modal";

@Component({
  selector: "actioner-select",
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title class="text-center">{{ title }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item [id]="id" button>
            <ion-label class="ion-text-wrap">{{ actioner?.Name || "Select an Actioner" }}</ion-label>
            <ion-icon name="person-outline" slot="start"></ion-icon>
          </ion-item>
          <operative-list-modal [trigger]="id"></operative-list-modal>
        </ion-list>
      </ion-card-content>
    </ion-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    OperativeListModal
  ]
})
export class ActionerSelectComponent {
  id = crypto.randomUUID();

  @Input()
  title: string = "To Action / Attention Of";

  @Input()
  actioner?: Operative;

  @Output()
  actionerChange = new EventEmitter<Operative>();
}
