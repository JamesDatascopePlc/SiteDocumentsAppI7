import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AngularComponent, withIonViewWillEnter, withIonViewWillLeave } from "../../lifecycles";

@Component({
  selector: "signature-pad",
  template: `
    <canvas></canvas>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class SignaturePadComponent extends AngularComponent(withIonViewWillEnter, withIonViewWillLeave) {
  // ionViewWillLoad() {
  //   screen.orientation.lock("portrait");
  // }

  // ionViewWillLeave() {
  //   screen.orientation.unlock();
  // }
}
