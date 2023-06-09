import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { useCategoryActioners } from "src/app/core/stores/category-actioners/category-actioners.store";
import { SelectableComponent } from "src/app/shared/components";
import { importRxTemplate } from "src/app/shared/imports";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";
import { param } from "src/app/shared/route";

@Component({
  selector: "category-actioner-select",
  template: `
    <ion-card *rxIf="categoryActioners != null">
      <ion-card-header>
        <ion-card-title class="text-center">{{ title || "Category Actioner" }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <selectable 
            [title]="title || 'Category Actioner'"
            placeholder="Actioner"
            [items]="categoryActioners!.data() | push"
            [value]="actionerId"
            itemValue="CategoryId"
            itemText="Name" />
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
export class CategoryActionerSelectComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  siteId = param("siteId")?.toNumber();

  categoryActioners = this.siteId != null 
    ? useCategoryActioners(this.siteId)
    : null;

  @Input()
  title?: string;

  @Input()
  hideMyself: boolean = false;

  @Input({ required: true })
  categoryId!: number;

  @Input({ required: true })
  actionerId?: number;

  @Output()
  actionerIdChange = new EventEmitter<number>();

  // categoryActioners$: Observable<CategoryActioner[]> = merge(this.afterViewInit(), this.input("categoryId")).pipe(
  //   switchMap(() => this.categoryActionersStore.categoryActionersById$(this.categoryId))
  // );

  // visibleCatActioners$: Observable<CategoryActioner[]> = merge(this.afterViewInit(), this.input("hideMyself")).pipe(
  //   switchMap(() => combineLatest({
  //     user: this.userStore.user$,
  //     catActioners: this.categoryActioners$
  //   })),
  //   map(({ user, catActioners }) => this.hideMyself 
  //     ? catActioners.filter(ca => ca.Id === user!.Id)
  //     : catActioners
  //   )
  // );

  // selectedActioner$: Observable<CategoryActioner | null> = merge(this.afterViewInit(), this.input("actionerId")).pipe(
  //   switchMap(() => this.categoryActioners$),
  //   map(catActioners => catActioners.find(ca => ca.Id === this.actionerId) || null)
  // );
}
