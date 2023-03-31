import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate } from "../../imports";
import { isMobileApp } from "../../plugins/platform.plugin";
import { IfComponent } from "../if/if.component";
import { UploadComponent } from "../upload/upload.component";

@Component({
  selector: "camera",
  template: `
    <ion-button [fill]="fill" [expand]="expand" [color]="color">
      <if [condition]="isMobileApp">
        <div show></div>
        <upload else accept="image/*"></upload>
      </if>
      <ng-content></ng-content>
    </ion-button>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule, 
    ...importRxTemplate(),
    IfComponent,
    UploadComponent
  ]
})
export class CameraComponent {
  @Input()
  fill?: "clear" | "outline" | "solid";

  @Input()
  expand?: "block" | "full";

  @Input()
  color?: string;

  isMobileApp = isMobileApp();
}
