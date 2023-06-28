import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Observable, map, merge } from "rxjs";
import { useTemplate } from "src/app/core/http/template.api";
import { importRxTemplate } from "src/app/shared/imports";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";
import { useGoRelative } from "src/app/shared/route";

@Component({
  selector: "child-document-card",
  template: `
    <ion-list>
      <ion-item lines="none">
        <ion-label class="text-lg">Action Document</ion-label>
        <ion-spinner *rxIf="template.isLoading() | push" slot="end" />
      </ion-item>
      <ion-item *rxIf="template.data(); let doc" lines="none">
        <ion-label>
          <p>{{ doc.DocumentTitle }}</p>
          <p>Action Documents Submitted: {{ amountSubmitted }}</p>
        </ion-label>
        <ion-button (click)="goRelative({ queryParams: { id: doc.DocumentID } })" fill="outline">
          <ion-icon name="pencil-outline" slot="icon-only" />
        </ion-button>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class ChildDocumentCardComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  goRelative = useGoRelative();

  @Input({ required: true })
  templateId!: number;
  templateId$: Observable<number> = merge(this.afterViewInit(), this.input("templateId")).pipe(
    map(() => this.templateId)
  );

  @Input()
  amountSubmitted: number = 0;

  template = useTemplate(this.templateId$);
}
