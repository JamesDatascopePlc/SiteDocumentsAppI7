import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { memoize } from "lodash-es";
import { LoginApi } from "src/app/core/http/login.api";
import { Site, UserStore } from "src/app/core/stores/user/user.store";
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
          itemText="Name"
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
  userStore = inject(UserStore);

  isMobileApp = isMobileApp();

  @Input()
  title?: string;

  @Input()
  siteId?: number;

  @Output()
  siteIdChange = new EventEmitter<number>();

  sites = useSites();

  siteChange(site: Site | null) {
    this.siteId = site!.Id;
    this.siteIdChange.emit(this.siteId);
  }
}

const useSites = memoize(() => {
  const loginApi = inject(LoginApi);

  return track(() => loginApi.getSites());
});