import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "remain-anonymous-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b>Remain Anonymous</b>
        </ion-label>
        <ion-icon 
          *rxIf="isTicked" 
          name="checkmark-circle" 
          color="success" />
        <ion-icon 
          *rxIf="!isTicked" 
          name="close-circle" 
          color="danger" />
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class RemainAnonymousSummaryComponent {
  @Input({ required: true })
  isTicked: boolean = false;
}
