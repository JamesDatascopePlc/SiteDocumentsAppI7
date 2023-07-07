import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SignaturePadDirective } from "../../components/signature-pad/signature-pad.component";
import { AngularComponent, withAfterViewInit } from "../../lifecycles";
import { importRxTemplate } from "../../imports";
import { CanvasImageDirective, MoveableDirective, ShowDirective } from "../../directives";
import { FormsModule } from "@angular/forms";
import { FontSize, PenColour, PenWeight, PenWeights } from "./models";
import { importAnnotationControls } from "./components/annotation-controls.import";
import { Changes, Toggle } from "../../utilities";

export type Brush = { colour: PenColour, weight: PenWeight }
export type Font = { colour: PenColour, size: FontSize }

@Component({
  selector: "image-annotation-modal",
  styles: [`
    .input {
      border: 1px solid #ccc;
      padding: 1px 6px;
    }
  `],
  template: `
    <ion-modal #modal [isOpen]="isOpen" [backdropDismiss]="false">
      <ng-template>
        <ion-content>
          <canvas 
            signature-pad 
            [src]="image"
            (beginStroke)="imageChanges.addUndo(signatureDirective!.toDataUrl())"
            [penColor]="brush.colour"
            [minWidth]="mode.value === 'Brush' ? brush.weight.min : 0"
            [maxWidth]="mode.value === 'Brush' ? brush.weight.max : 0">
          </canvas>

          <div *rxIf="mode.value === 'Text'" class="absolute w-full h-full top-0 left-0">
            <div
              class="absolute 
              top-1/2 
              left-1/2 
              -translate-x-1/2 
              -translate-y-1/2
              p-2" 
              moveable>
              <span 
                role="textbox" 
                [style.color]="font.colour" 
                [style.font-size]="font.size + 'px'" 
                contenteditable>
                Enter Text Here
              </span>
            </div>
          </div>
        </ion-content>
        
        <ion-footer>
          <brush-controls [show]="mode.value === 'Brush'" [(brush)]="brush" />
          <text-controls [show]="mode.value === 'Text'" [(font)]="font" />

          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button class="float-left" (click)="modal.dismiss()">Cancel</ion-button>
              </ion-col>

              <ion-col>
                <ion-button [show]="imageChanges.undoCount > 0" (click)="image = imageChanges.undo(image)!">
                  <ion-icon name="arrow-undo-outline" />
                </ion-button>
              </ion-col>

              <ion-col>
                <ion-button [show]="mode.value === 'Brush'" (click)="mode.toggle()">
                  <ion-icon name="create-outline" />
                </ion-button>
                <ion-button [show]="mode.value === 'Text'" (click)="mode.toggle()">
                  <ion-icon name="pencil-outline" />
                </ion-button>
              </ion-col>

              <ion-col>
                <ion-button [show]="imageChanges.redoCount > 0" (click)="image = imageChanges.redo()!">
                  <ion-icon name="arrow-redo-outline" />
                </ion-button>
              </ion-col>

              <ion-col>
                <ion-button class="float-right" (click)="save()">Save</ion-button>
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
    MoveableDirective,
    ...importAnnotationControls()
  ],
})
export class ImageAnnotationModal extends AngularComponent(withAfterViewInit) {
  @ViewChild(SignaturePadDirective)
  signatureDirective?: SignaturePadDirective;

  isOpen: boolean = false;
  mode: Toggle<"Brush" | "Text"> = new Toggle("Brush", "Text");

  @Input()
  image: string = "";
  imageChanges: Changes<string> = new Changes<string>();
  @Output()
  imageChange = new EventEmitter<string>();

  brush: Brush = {
    colour: PenColour.Black,
    weight: PenWeights.Fine
  }

  font: Font = {
    colour: PenColour.Black,
    size: 14
  }

  save(): void {
    const image = this.signatureDirective?.toDataUrl() || "";
    this.imageChange.emit(image);
  }
}
