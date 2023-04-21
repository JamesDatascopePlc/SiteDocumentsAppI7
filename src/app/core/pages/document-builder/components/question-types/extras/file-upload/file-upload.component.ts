import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { IfComponent } from "src/app/shared/components/if/if.component";
import { UploadComponent } from "src/app/shared/components/upload/upload.component";
import { DataUrlFile } from "src/app/shared/models/files/data-url-file.model";

@Component({
  selector: "file-upload",
  template: `
    <if [condition]="filename == null">
      <ion-button show fill="clear">
        <upload (uploadFiles)="upload($event)"></upload>
        <ion-icon name="cloud-upload-outline"></ion-icon>
      </ion-button>

      <ion-button else (click)="clear()" fill="clear" color="danger">
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
  dataUrl: string | null = null;

  upload(files: DataUrlFile[]) {
    if (files[0] != null) {
      this.filename = files[0].name;
      this.dataUrl = files[0].dataUrl;
    }
  }

  clear() {
    this.filename = null;
    this.dataUrl = null;
  }
}