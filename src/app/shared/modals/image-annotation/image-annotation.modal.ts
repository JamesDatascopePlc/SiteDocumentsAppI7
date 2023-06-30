import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SignaturePadDirective } from "../../components/signature-pad/signature-pad.component";
import { AngularComponent, withAfterViewInit } from "../../lifecycles";
import { importRxTemplate } from "../../imports";
import { CanvasResize } from "../../directives";

@Component({
  selector: "image-annotation-modal",
  template: `
    <ion-modal #modal [isOpen]="isOpen">
      <ng-template>
        <ion-content>
          <canvas 
            signature-pad 
            resize
            class="border border-black bg-white">
          </canvas>
        </ion-content>
        
        <ion-footer>
          <ion-grid>
            <ion-row>
              <ion-col>
                <swiper-container>
                  <swiper-slide>
                    <ion-select>
                      <ion-select-option>Black</ion-select-option>
                      <ion-select-option>White</ion-select-option>
                      <ion-select-option>Red</ion-select-option>
                      <ion-select-option>Blue</ion-select-option>
                      <ion-select-option>Green</ion-select-option>
                      <ion-select-option>Yellow</ion-select-option>
                    </ion-select>
                    <ion-select>
                      <ion-select-option>Extra Fine</ion-select-option>
                      <ion-select-option>Fine</ion-select-option>
                      <ion-select-option>Regular</ion-select-option>
                      <ion-select-option>Bold</ion-select-option>
                      <ion-select-option>Extra Bold</ion-select-option>
                    </ion-select>

                    <ion-button>
                      <ion-icon name="reader-outline"></ion-icon>
                    </ion-button>
                  </swiper-slide>
                </swiper-container>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-button class="float-left" (click)="modal.dismiss()">Cancel</ion-button>
              </ion-col>
              <ion-col>
                <ion-button class="float-right">Save</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-footer>
      </ng-template>
    </ion-modal>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonicModule,
    ...importRxTemplate(),
    SignaturePadDirective,
    CanvasResize
  ],
})
export class ImageAnnotationModal extends AngularComponent(withAfterViewInit) {
  isOpen: boolean = false;

}
