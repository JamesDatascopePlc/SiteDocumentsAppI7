import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SelectableComponent } from "src/app/shared/components";
import { importRxTemplate } from "src/app/shared/imports";
import { isMobileApp } from "src/app/shared/plugins/platform.plugin";

@Component({
  selector: "site-select",
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title class="text-center">{{ title }}</ion-card-title>
        <p *rxIf="isMobileApp" class="text-center">
          <b>Setting site only attaches site on to this document and does not change site in settings</b>
        </p>
      </ion-card-header>
      <ion-card-content>
        <selectable [title]="title" placeholder="Select Site"></selectable>
      </ion-card-content>
    </ion-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    SelectableComponent
  ]
})
export class SiteSelectComponent {
  isMobileApp = isMobileApp();

  @Input()
  title: string = "Select a site";

  @Input()
  value?: number;

  @Output()
  valueChange = new EventEmitter<number>();
}
