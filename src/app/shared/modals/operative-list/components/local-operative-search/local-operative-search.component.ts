import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Operative, OperativesStore } from "src/app/core/stores/operative/operatives.store";
import { UserStore } from "src/app/core/stores/user/user.store";
import { importRxTemplate } from "src/app/shared/imports";
import { AngularComponent } from "src/app/shared/lifecycles";

@Component({
  selector: "local-operative-search",
  template: `
    <ion-searchbar class="animate__animated animate__fadeIn"></ion-searchbar>

    <ion-list>
      <ion-item 
        *rxIf="user$; let user"
        (click)="select.emit({ ID: user.Id, Name: user.FirstName + ' ' + user.LastName })"
        class="animate__animated animate__flipInX animate__faster" 
        button>
          {{ user.Id }} - {{ user.FirstName }} {{ user.LastName }}
      </ion-item>
      <ion-item-sliding *rxFor="let op of operatives$; last as isLast">
        <ion-item 
          class="animate__animated animate__flipInX animate__faster" 
          button>
          {{ op.ID }} - {{ op.Name }}
        </ion-item>
        <ion-item-options side="end">
          <ion-item-option color="danger">
            <ion-icon name="trash-bin-outline"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
  ]
})
export class LocalOperativeSearchComponent extends AngularComponent() {
  userStore = inject(UserStore);
  operativesStore = inject(OperativesStore);

  @Output()
  select = new EventEmitter<Operative>();

  user$ = this.userStore.user$;
  operatives$ = this.operativesStore.operatives$;
}
