import { NgStyle } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { DetailsList } from "src/app/core/http/asset.api";
import { importRxTemplate } from "src/app/shared/imports";
import { UtcDatePipe } from "src/app/shared/pipes";

@Component({
  selector: "details-lists",
  template: `
    <ion-list>
      <ng-container *rxFor="let detail of details">
        <ion-list-header>{{ detail.Title }}</ion-list-header>
        
        <ng-container *rxFor="let info of detail.ListItems">
          <ion-item *rxIf="info.ListItemType !== 'FILE'">
            <ion-icon slot="start" [name]="info.Icon" [ngStyle]="info.IconStyle" />
            <ion-label>{{ info.Content }}</ion-label>
            <span *rxIf="info.Date != null" slot="end">{{ info.Date | utcDate }}</span>
          </ion-item>
          
          <ion-item button detail *rxIf="info.ListItemType === 'FILE'">
            <ion-icon slot="start" [name]="info.Icon" [ngStyle]="info.IconStyle" />
            <ion-label>{{ info.Content }}</ion-label>
            <span *rxIf="info.Date != null" slot="end">{{ info.Date | utcDate }}</span>
          </ion-item>
        </ng-container>
      </ng-container>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule, 
    ...importRxTemplate(),
    NgStyle,
    UtcDatePipe
  ]
})
export class DetailsListsComponent {
  @Input()
  details: DetailsList[] = [];
}
