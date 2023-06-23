import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { map, merge, Observable } from "rxjs";
import { Queue } from "src/app/core/stores/site-document/models/site-document.model";
import { SelectableComponent } from "src/app/shared/components/selectable/selectable.component";
import { importRxTemplate } from "src/app/shared/imports";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";

@Component({
  selector: "queue-select",
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title class="text-center">{{ title }}</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <ion-list>
          <selectable 
            [title]="title"
            placeholder="Queues"
            (valueChange)="queueIdChange.emit($event!.id)"
            [items]="queues" 
            [(value)]="queueId"
            itemText="Name"
            itemValue="Id"
            [canClear]="false" />
        </ion-list>
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
export class QueueSelectComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  @Input()
  title: string = "Select Queue";

  @Input()
  queues: Queue[] = [];

  @Input()
  queueId?: number;

  @Output()
  queueIdChange = new EventEmitter<number>();

  queue$: Observable<Queue | undefined> = merge(
    this.afterViewInit(),
    this.input("queueId")
  ).pipe(
    map(() => this.queues.find(q => q.Id === this.queueId))
  );
}
