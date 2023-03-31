import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { IfComponent } from "src/app/shared/components/if/if.component";
import { UploadComponent } from "src/app/shared/components/upload/upload.component";

@Component({
  selector: "file-upload",
  template: `
    <if [condition]="filename == null">
      <ion-button show fill="clear">
        <upload></upload>
        <ion-icon name="cloud-upload-outline"></ion-icon>
      </ion-button>

      <ion-button else fill="clear" color="danger">
        <ion-icon name="trash-bin-outline"></ion-icon>
      </ion-button>
    </if>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    IfComponent,
    UploadComponent
  ]
})
export class FileUploadComponent {
  filename: string | null = null;
}