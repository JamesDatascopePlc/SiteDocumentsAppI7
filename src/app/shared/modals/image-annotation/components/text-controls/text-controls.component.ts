import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Font } from "../../image-annotation.modal";
import { FontSize, PenColourOption, useFontSizes, usePenColours } from "../../models";
import { importRxTemplate } from "src/app/shared/imports";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "text-controls",
  template: `
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-select #fontColourSelect class="hidden" label="Colour" [(ngModel)]="font.colour" (ngModelChange)="fontChange.emit(font)">
            <ion-select-option *rxFor="let colour of colours" [value]="colour.value">
              {{ colour.label }}
            </ion-select-option>
          </ion-select>
          <ion-button (click)="fontColourSelect.open($event)" fill="outline">
            Colour <ion-icon name="ellipse" slot="end" [style.color]="font.colour" />
          </ion-button>
        </ion-col>

        <ion-col>
          <ion-select label="Size" [(ngModel)]="font.size" (ngModelChange)="fontChange.emit(font)" label-placement="floating" fill="outline">
            <ion-select-option *rxFor="let size of sizes" [value]="size">
              {{ size }}
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
export class TextControlsComponent {
  colours: PenColourOption[] = usePenColours();
  sizes: FontSize[] = useFontSizes();

  @Input({ required: true })
  font!: Font;

  @Output()
  fontChange = new EventEmitter<Font>();
}
