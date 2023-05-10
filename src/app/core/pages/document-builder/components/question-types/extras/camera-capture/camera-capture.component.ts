import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CameraComponent, IfComponent } from "src/app/shared/components";
import { PhotoViewerDirective } from "src/app/shared/directives";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "camera-capture",
  template: `
    <if [condition]="base64Img == null">
      <camera show (takePhoto)="take($event)" fill="clear">
        <ion-icon name="camera-outline" slot="icon-only" />
      </camera>

      <ng-container else>
        <ion-button [photo-viewer]="base64Img!" [unpatch] fill="clear">
          <ion-icon name="eye-outline" slot="icon-only" />
        </ion-button>
        <ion-button (click)="remove()" fill="clear" color="danger">
          <ion-icon name="close-outline" slot="icon-only" />
        </ion-button>
      </ng-container>
    </if>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    IfComponent,
    CameraComponent,
    PhotoViewerDirective
  ]
})
export class CameraCaptureComponent {

  @Input()
  base64Img: string | null = null;

  @Output()
  base64ImgChange = new EventEmitter<string | null>();

  take(base64Img: string) {
    this.base64Img = base64Img || null;
    this.base64ImgChange.emit(this.base64Img);
  }

  remove() {
    this.base64Img = null;
    this.base64ImgChange.emit(this.base64Img);
  }
}
