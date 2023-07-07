import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Brush } from "../../image-annotation.modal";
import { importRxTemplate } from "src/app/shared/imports";
import { PenColourOption, PenWeightOption, usePenColours, usePenWeights } from "../../models";

@Component({
  selector: "brush-controls",
  template: `
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-select #colourSelect class="hidden" label="Colour" [(ngModel)]="brush.colour" (ngModelChange)="brushChange.emit(brush)">
            <ion-select-option *rxFor="let colour of colours; strategy: 'immediate'" [value]="colour.value">
              {{ colour.label }}
            </ion-select-option>
          </ion-select>
          <ion-button (click)="colourSelect.open($event)" fill="outline">
            Colour <ion-icon name="ellipse" slot="end" [style.color]="brush.colour" />
          </ion-button>
        </ion-col>

        <ion-col>
          <ion-select label="Weight" [(ngModel)]="brush.weight" (ngModelChange)="brushChange.emit(brush)" label-placement="floating" fill="outline">
            <ion-select-option *rxFor="let weight of weights; strategy: 'immediate'" [value]="weight.value">
              {{ weight.label }}
            </ion-select-option>
          </ion-select>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule, 
    ...importRxTemplate(),
    FormsModule
  ]
})
export class BrushControlsComponent {
  colours: PenColourOption[] = usePenColours();
  weights: PenWeightOption[] = usePenWeights();

  @Input({ required: true })
  brush!: Brush;

  @Output()
  brushChange = new EventEmitter<Brush>();
}
