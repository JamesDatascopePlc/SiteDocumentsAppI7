import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SignaturePadDirective } from "../../components/signature-pad/signature-pad.component";
import { AngularComponent, withAfterViewInit } from "../../lifecycles";
import { importRxTemplate } from "../../imports";
import { CanvasImageDirective, MoveableDirective, ShowDirective } from "../../directives";
import { FormsModule } from "@angular/forms";
import { FontSize, PenColour, PenColourOption, PenWeight, PenWeightOption, PenWeights, useFontSizes, usePenColours, usePenWeights } from "./models";

export type Brush = { colour: PenColour, weight: PenWeight }
export type Font = { colour: PenColour, size: FontSize }

@Component({
  selector: "image-annotation-modal",
  styles: [`
    .target {
      position: absolute;
      width: 100px;
      height: 100px;
      top: 150px;
      left: 100px;
      line-height: 100px;
      text-align: center;
      background: #ee8;
      color: #333;
      font-weight: bold;
      border: 1px solid #333;
      box-sizing: border-box;
    }
  `],
  template: `
    <ion-modal #modal [isOpen]="isOpen" [backdropDismiss]="false">
      <ng-template>
        <ion-content>
          <!-- <canvas 
            signature-pad 
            [src]="image"
            [penColor]="brush.colour"
            [minWidth]="brush.weight.min"
            [maxWidth]="brush.weight.max">
          </canvas> -->

          <div class="target" moveable>
            <!-- <ion-button fill="outline">
              <ion-icon slot="icon-only" name="add-circle-outline" size="small"></ion-icon>
            </ion-button> -->
          </div>

        </ion-content>
        
        <ion-footer>
          <ion-grid>
            <ion-row [show]="mode === 'Brush'">
              <ion-col>
                <ion-select #colourSelect class="hidden" label="Colour" [(ngModel)]="brush.colour">
                  <ion-select-option *rxFor="let colour of colours; strategy: 'immediate'" [value]="colour.value">
                    {{ colour.label }}
                  </ion-select-option>
                </ion-select>
                <ion-button (click)="colourSelect.open($event)" fill="outline">
                  Colour <ion-icon name="ellipse" slot="end" [style.color]="brush.colour" />
                </ion-button>
              </ion-col>

              <ion-col>
                <ion-select label="Weight" [(ngModel)]="brush.weight" label-placement="floating" fill="outline">
                  <ion-select-option *rxFor="let weight of weights; strategy: 'immediate'" [value]="weight.value">
                    {{ weight.label }}
                  </ion-select-option>
                </ion-select>
              </ion-col>

              <ion-col>
                <ion-button (click)="toggle()">
                  Add Text
                  <ion-icon name="create-outline" slot="end" />
                </ion-button>
              </ion-col>
            </ion-row>

            <ion-row [show]="mode === 'Text'">
              <ion-col>
                <ion-button (click)="toggle()">
                  <ion-icon name="arrow-back-outline" />
                </ion-button>
              </ion-col>

              <ion-col>
                <ion-select #colourSelect class="hidden" label="Colour" [(ngModel)]="font.colour">
                  <ion-select-option *rxFor="let colour of colours" [value]="colour.value">
                    {{ colour.label }}
                  </ion-select-option>
                </ion-select>
                <ion-button (click)="colourSelect.open($event)" fill="outline">
                  Colour <ion-icon name="ellipse" slot="end" [style.color]="brush.colour" />
                </ion-button>
              </ion-col>

              <ion-col>
                <ion-select label="Size" [(ngModel)]="font.size" label-placement="floating" fill="outline">
                  <ion-select-option *rxFor="let size of sizes" [value]="size">
                    {{ size }}
                  </ion-select-option>
                </ion-select>
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
  imports: [
    IonicModule,
    ...importRxTemplate(),
    FormsModule,
    SignaturePadDirective,
    CanvasImageDirective,
    ShowDirective,
    MoveableDirective
  ],
})
export class ImageAnnotationModal extends AngularComponent(withAfterViewInit) {
  @ViewChild(SignaturePadDirective)
  signatureDirective?: SignaturePadDirective;

  isOpen: boolean = false;

  mode: "Brush" | "Text" = "Brush";
  toggle() {
    this.mode = this.mode === "Text" ? "Brush" : "Text";
  }

  @Input()
  image: string = "";
  @Output()
  imageChange = new EventEmitter<string>();

  colours: PenColourOption[] = usePenColours();
  weights: PenWeightOption[] = usePenWeights();
  sizes: FontSize[] = useFontSizes();

  brush: Brush = {
    colour: PenColour.Black,
    weight: PenWeights.Fine
  }

  font: Font = {
    colour: PenColour.Black,
    size: 14
  }

  save() {
    const image = this.signatureDirective?.toDataUrl();
    this.imageChange.emit(image);
  }
}
