import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { memoize } from "lodash-es";
import { useLoginApi } from "src/app/core/http/login.api";
import { Site } from "src/app/core/stores/user/user.store";
import { SelectableComponent } from "src/app/shared/components";
import { importRxTemplate } from "src/app/shared/imports";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";
import { isMobileApp } from "src/app/shared/plugins/platform.plugin";
import { track } from "src/app/shared/rxjs";

@Component({
  selector: "site-select",
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title class="text-center">{{ title || "Select a site" }}</ion-card-title>
        <p *rxIf="isMobileApp" class="text-center">
          <b>Setting site only attaches site on to this document and does not change site in settings</b>
        </p>
      </ion-card-header>
      <ion-card-content>
        <selectable 
          [title]="title || 'Select a site'" 
          placeholder="Select Site"
          [items]="sites.data() | push"
          itemValue="Id"
          itemText="Name"
          [value]="siteId"
          (valueChange)="siteChange($event)"
          [canClear]="false" />
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
export class SiteSelectComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  isMobileApp = isMobileApp();
  sites = useSites();

  @Input()
  title?: string;

  @Input()
  siteId?: number;

  @Output()
  siteIdChange = new EventEmitter<number>();

  siteChange(siteId: number) {
    this.siteId = siteId;
    this.siteIdChange.emit(this.siteId);
  }
}

const useSites = memoize(() => {
  const loginApi = useLoginApi();

  return track(() => loginApi.getSites()).fire();
});