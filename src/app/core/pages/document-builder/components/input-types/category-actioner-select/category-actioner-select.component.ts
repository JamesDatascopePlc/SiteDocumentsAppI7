import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Observable, combineLatest, map, merge, switchMap } from "rxjs";
import { CategoryActioner, CategoryActionersStore } from "src/app/core/stores/category-actioners/category-actioners.store";
import { UserStore } from "src/app/core/stores/user/user.store";
import { SelectableComponent } from "src/app/shared/components";
import { importRxTemplate } from "src/app/shared/imports";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";

@Component({
  selector: "category-actioner-select",
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title class="text-center">{{ title || "Category Actioner" }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <selectable 
            [title]="title || 'Category Actioner'"
            placeholder="Actioner"
            [value]="selectedActioner$ | push"
            [items]="visibleCatActioners$ | push"
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
  userStore = inject(UserStore);
  categoryActionersStore = inject(CategoryActionersStore);
  
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

  categoryActioners$: Observable<CategoryActioner[]> = merge(this.afterViewInit(), this.input("categoryId")).pipe(
    switchMap(() => this.categoryActionersStore.categoryActionersById$(this.categoryId))
  );

  visibleCatActioners$: Observable<CategoryActioner[]> = merge(this.afterViewInit(), this.input("hideMyself")).pipe(
    switchMap(() => combineLatest({
      user: this.userStore.user$,
      catActioners: this.categoryActioners$
    })),
    map(({ user, catActioners }) => this.hideMyself 
      ? catActioners.filter(ca => ca.Id === user!.Id)
      : catActioners
    )
  );

  selectedActioner$: Observable<CategoryActioner | null> = merge(this.afterViewInit(), this.input("actionerId")).pipe(
    switchMap(() => this.categoryActioners$),
    map(catActioners => catActioners.find(ca => ca.Id === this.actionerId) || null)
  );
}
