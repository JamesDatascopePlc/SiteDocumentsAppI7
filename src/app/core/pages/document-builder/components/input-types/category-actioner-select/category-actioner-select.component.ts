import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { useCategoryActioners } from "src/app/core/http/login.api";
import { IfComponent, SelectableComponent } from "src/app/shared/components";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "category-actioner-select",
  template: `
  <if *rxLet="categoryActioners.data(); let actioners" 
      [condition]="actioners.length > 0">
    <ion-card show>
      <ion-card-header>
        <ion-card-title class="text-center">{{ title || "Category Actioner" }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <selectable 
            [title]="title || 'Category Actioner'"
            placeholder="Actioner"
            [items]="actioners"
            [(value)]="actionerId"
            itemValue="Id"
            itemText="Name" 
            (valueChange)="actionerIdChange.emit(actionerId)" />
        </ion-list>
      </ion-card-content>
    </ion-card>
    
    <p else>
      This document is not submittable as it does not have category actioners that match this document's category type. Please notify your admin.
    </p>
  </if>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    SelectableComponent,
    IfComponent
  ]
})
export class CategoryActionerSelectComponent {
  userId: number = 0;

  @Input()
  title?: string;

  @Input()
  hideMyself: boolean = false;

  @Input()
  categoryId?: number;
  categoryActioners = useCategoryActioners(this.categoryId);

  @Input({ required: true })
  actionerId?: number;

  @Output()
  actionerIdChange = new EventEmitter<number>();
}
