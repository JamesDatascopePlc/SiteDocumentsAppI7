import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SiteDocument } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "document-summary-modal",
  template: `
    <ion-modal #modal [trigger]="trigger" [isOpen]="isOpen">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title class="text-center">Summary</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="modal.dismiss()" [unpatch]>
                <ion-icon name="close-outline" slot="icon-only" />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <ion-item *rxIf="document.CurrentActionerOperativeID != null" lines="none">
            <ion-label>
              <h3>{{ document.MetaData.ActionerText || "Actioner" }}</h3>
              <p>{{ document.CurrentActionerOperativeID }}</p>
            </ion-label>
          </ion-item>
        
          <ion-item *rxIf="document.CompanyActionerId != null" lines="none">
            <ion-label>
              <h3>{{ document.MetaData.ActionerText || "Company Actioner" }}</h3>
              <p>{{ document.CompanyActionerId }}</p>
            </ion-label>
          </ion-item>

          <ion-item *rxIf="document.AutoQueueID != null" lines="none">
            <ion-label>
              <h3>Queue</h3>
              <p>{{ document.CompanyActionerId }}</p>
            </ion-label>
          </ion-item>

          <ion-item *rxIf="document.SiteId != null" lines="none">
            <ion-label>
              <h3>{{ document.MetaData.SiteListTitle || "Site" }}</h3>
              <p>{{ document.SiteId }}</p>
            </ion-label>
          </ion-item>

          <ion-item *rxIf="document.QueueDuration != null" lines="none">
            <ion-label>
              <h3>Queue Duration</h3>
              <p>{{ document.QueueDuration.Value }} ({{ document.QueueDuration.Type }})</p>
            </ion-label>
          </ion-item>

          <ion-item *rxIf="document.RemainAnon" lines="none">
            <ion-checkbox checked disabled="true">Remain Anonymous?</ion-checkbox>
          </ion-item>
        </ion-content>

        <ion-footer>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button (click)="modal.dismiss()" color="danger" expand="full">Cancel</ion-button>
              </ion-col>
              <ion-col>
                <ion-button (click)="submit.emit()" expand="full">Submit</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-footer>
      </ng-template>
    </ion-modal>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
  ]
})
export class DocumentSummaryModal {
  @Input({ required: true })
  trigger!: string;

  @Input()
  isOpen: boolean = false;

  @Input({ required: true })
  document!: SiteDocument;

  @Output()
  submit = new EventEmitter<void>();
}