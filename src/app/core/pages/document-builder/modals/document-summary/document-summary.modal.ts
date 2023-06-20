import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { QuestionType, SiteDocument } from "src/app/core/stores/site-document/models";
import { importNgSwitch, importRxTemplate } from "src/app/shared/imports";
import { importQuestionSummaries } from "../../components/question-types/question-summary.imports";

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

          <ng-container *rxFor="let page of document.Pages">
            <ng-container *rxFor="let section of page.Sections">
              <ng-container *rxFor="let question of section.Questions" [ngSwitch]="section.SectionQuestiontype">
                <checkbox-summary *ngSwitchCase="QuestionType.Checkbox" [question]="question" />
                <radio-group-summary *ngSwitchCase="QuestionType.RadioGroup" [question]="question" />
                <textbox-summary *ngSwitchCase="QuestionType.Textbox" [question]="question" />
                <textbox-summary *ngSwitchCase="QuestionType.TextArea" [question]="question" />
                <select-summary *ngSwitchCase="QuestionType.Select" [question]="question" />
                <checkbox-textbox-summary *ngSwitchCase="QuestionType.CheckboxTextbox" [question]="question" />
                <radio-group-textbox-summary *ngSwitchCase="QuestionType.RadioGroupTextbox" [question]="question" />
                <date-summary *ngSwitchCase="QuestionType.Date" [question]="question" />
                <datetime-summary *ngSwitchCase="QuestionType.DateTime" [question]="question" />
                <number-summary *ngSwitchCase="QuestionType.Number" [question]="question" />
                <linked-dates-summary *ngSwitchCase="QuestionType.LinkedDates" [question]="question" />
                <signature-summary *ngSwitchCase="QuestionType.Signature" [question]="question" />
              </ng-container>
            </ng-container>
          </ng-container>

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
    ...importNgSwitch(),
    ...importQuestionSummaries()
  ]
})
export class DocumentSummaryModal {
  QuestionType = QuestionType;

  @Input({ required: true })
  trigger!: string;

  isOpen: boolean = false;

  @Input({ required: true })
  document!: SiteDocument;

  @Output()
  submit = new EventEmitter<void>();
}