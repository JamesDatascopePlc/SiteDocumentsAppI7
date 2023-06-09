import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Operative, OperativesStore } from "src/app/core/stores/operative/operatives.store";
import { UserStore } from "src/app/core/stores/user/user.store";
import { importRxTemplate } from "src/app/shared/imports";
import { AngularComponent } from "src/app/shared/lifecycles";

@Component({
  selector: "local-operative-search",
  template: `
    <ion-searchbar [(ngModel)]="search" class="animate__animated animate__fadeIn" debounce="300" />

    <ion-list *rxLet="user$; let user">
      <ion-item 
        *rxIf="!hideMyself && user != null"
        (click)="select.emit({ ID: user.Id, Name: user.FirstName + ' ' + user.LastName })"
        button>
          {{ user.Id }} - {{ user.FirstName }} {{ user.LastName }}
      </ion-item>
      <ion-item-sliding *rxFor="let op of operatives$; last as isLast">
        <ion-item (click)="select.emit(op)" button>
          {{ op.ID }} - {{ op.Name }}
        </ion-item>
        <ion-item-options side="end">
          <ion-item-option color="danger">
            <ion-icon name="trash-bin-outline" />
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
    FormsModule
  ]
})
export class LocalOperativeSearchComponent extends AngularComponent() {
  userStore = inject(UserStore);
  operativesStore = inject(OperativesStore);

  @Output()
  select = new EventEmitter<Operative>();

  @Input()
  hideMyself: boolean = false;

  search: string = "";

  user$ = this.userStore.user$;
  operatives$ = this.operativesStore.operatives$;
}
