import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { IfComponent } from "src/app/shared/components/if/if.component";
import { UploadComponent } from "src/app/shared/components/upload/upload.component";
import { DataUrlFile } from "src/app/shared/models/files/data-url-file.model";

@Component({
  selector: "file-upload",
  template: `
    <if [condition]="dataUrl == null">
      <ion-button show fill="clear">
        <upload (uploadFiles)="upload($event)" />
        <ion-icon name="cloud-upload-outline" />
      </ion-button>

      <ion-button else (click)="clear()" fill="clear" color="danger">
        <ion-icon name="trash-bin-outline" />
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
  @Input()
  filename: Nullable<string> = null;
  @Input()
  dataUrl: Nullable<string> = null;

  @Output()
  filenameChange = new EventEmitter<Nullable<string>>();
  @Output()
  dataUrlChange = new EventEmitter<Nullable<string>>();

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