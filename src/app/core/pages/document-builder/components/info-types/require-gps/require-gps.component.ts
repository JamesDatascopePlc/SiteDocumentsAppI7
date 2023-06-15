import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "require-gps",
  template: `
    <ion-grid>
      <ion-row>
        <ion-col>
          <p>
            Your GPS location will be used upon submission of the form
          </p>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule]
})
export class RequireGpsComponent {}
