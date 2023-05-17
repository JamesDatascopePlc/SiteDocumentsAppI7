import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Observable, map, merge, switchMap } from "rxjs";
import { Operative, OperativesStore } from "src/app/core/stores/operative/operatives.store";
import { importRxTemplate } from "src/app/shared/imports";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";
import { OperativeListModal } from "src/app/shared/modals/operative-list/operative-list.modal";

@Component({
  selector: "actioner-select",
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title class="text-center">{{ title || "To Action / Attention Of" }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item [id]="id" button>
            <ion-label *rxLet="selectedActioner$; let actioner" class="ion-text-wrap">{{ actioner?.Name || "Select an Actioner" }}</ion-label>
            <ion-icon name="person-outline" slot="start" />
          </ion-item>
          <operative-list-modal [trigger]="id" (operativeChange)="actionerId = $event.ID; actionerIdChange.emit($event.ID)" />
        </ion-list>
      </ion-card-content>
    </ion-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    OperativeListModal
  ]
})
export class ActionerSelectComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  operativesStore = inject(OperativesStore);

  operatives$ = this.operativesStore.operatives$;

  id = crypto.randomUUID();

  @Input()
  title?: string;

  @Input()
  hideMyself: boolean = false;

  @Input()
  actionerId?: number;

  @Output()
  actionerIdChange = new EventEmitter<number>();

  selectedActioner$: Observable<Operative | null> = merge(
    this.afterViewInit$(), 
    this.input$("actionerId"), 
    this.actionerIdChange
  ).pipe(
    switchMap(() => this.operatives$),
    map(operatives => operatives.find(o => o.ID === this.actionerId) || null),
  );
}