import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { useCategoryActioners } from "src/app/core/http/login.api";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "category-actioner-select-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label>
          <b>{{ title || "Category Actioner" }}</b>
          <p *rxIf="actioner(); let actioner">{{ actioner.Name }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class CategoryActionerSelectSummaryComponent {
  @Input()
  title?: string;

  @Input()
  categoryId?: number;
  categoryActioners = useCategoryActioners(this.categoryId);

  @Input({ required: true })
  actionerId?: number;
  actioner = this.categoryActioners.data(actioners => actioners.find(a => a.Id === this.actionerId));
}
