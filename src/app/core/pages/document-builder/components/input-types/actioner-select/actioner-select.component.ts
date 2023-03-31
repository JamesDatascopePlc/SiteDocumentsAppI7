import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Operative } from "src/app/core/stores/operative/operative.store";

@Component({
  selector: "actioner-select",
  template: `
    <ion-card>
      <ion-card-header>
        <h2 class="ion-text-center ion-text-wrap">{{ title }}</h2>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item [id]="operativeSearchId" button>
            <ion-label class="ion-text-wrap">{{ actioner?.Name || "Select an Actioner" }}</ion-label>
            <ion-icon name="person-outline" slot="start"></ion-icon>
          </ion-item>
          <!-- <operative-search-modal [trigger]="operativeSearchId"></operative-search-modal> -->
        </ion-list>
      </ion-card-content>
    </ion-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    //OperativeSearchModal
  ]
})
export class ActionerSelectComponent {
  operativeSearchId = crypto.randomUUID();

  @Input()
  title: string = "To Action / Attention Of";

  @Input()
  actioner?: Operative;

  @Output()
  actionerChange = new EventEmitter<Operative>();
}
