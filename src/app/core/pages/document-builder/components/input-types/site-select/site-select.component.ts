import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { map } from "rxjs";
import { Site, UserStore } from "src/app/core/stores/user/user.store";
import { SelectableComponent } from "src/app/shared/components";
import { importRxTemplate } from "src/app/shared/imports";
import { AngularComponent, withAfterViewInit } from "src/app/shared/lifecycles";
import { isMobileApp } from "src/app/shared/plugins/platform.plugin";

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
          [items]="sites$ | push"
          itemText="Name"
          [value]="selectedSite$ | push"
          (valueChange)="siteChange($event)"
          [canClear]="false">
        </selectable>
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
export class SiteSelectComponent extends AngularComponent(withAfterViewInit) {
  userStore = inject(UserStore);

  isMobileApp = isMobileApp();

  @Input()
  title?: string;

  @Input()
  value?: number;

  @Output()
  valueChange = new EventEmitter<number>();

  sites$ = this.userStore.sites$;

  selectedSite$ = this.sites$.pipe(
    map(sites => sites.find(s => s.Id === this.value) || null)
  );

  siteChange(site: Site | null) {
    this.value = site!.Id;
    this.valueChange.emit(this.value);
  }
}
