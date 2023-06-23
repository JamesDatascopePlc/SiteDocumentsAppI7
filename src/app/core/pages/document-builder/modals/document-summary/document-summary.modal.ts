import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { QuestionType, SiteDocument } from "src/app/core/stores/site-document/models";
import { importNgSwitch, importRxTemplate } from "src/app/shared/imports";
import { importInputSummaries, importQuestionSummaries } from "../../components";

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
          <actioner-select-summary
            *rxIf="document.CanAddActionerFromApp && document.CurrentActionerOperativeID != null" 
            [title]="document.MetaData.ActionerText"
            [actionerId]="document.CurrentActionerOperativeID" />

          <category-actioner-select-summary 
            *rxIf="document.CanAddCategoryActioner" 
            [title]="document.MetaData.ActionerText"
            [categoryId]="document.DocumentCategory"
            [actionerId]="document.CurrentActionerOperativeID" />

          <company-actioner-select-summary
            *rxIf="document.CompanyActionerId != null" 
            [title]="document.MetaData.ActionerText" 
            [companyId]="document.CompanyActionerId" />

          <queue-select-summary 
            *rxIf="document.Queues && document.Queues.length > 0 && document.AutoQueueID != null" 
            [queues]="document.Queues"
            [queueId]="document.AutoQueueID" />

          <site-select-summary 
            *rxIf="document.MetaData?.HasSiteList && document.SiteId != null"
            [title]="document.MetaData.SiteListTitle"
            [siteId]="document.SiteId" />

          <queue-duration-summary 
            *rxIf="document.QueueDuration != null" 
            [duration]="document.QueueDuration" />

          <ng-container *rxFor="let page of document.Pages">
            <h1 *rxIf="page.PageTitle.length > 0">{{ page.PageTitle }}</h1>

            <ng-container *rxFor="let section of page.Sections">
              <h3 *rxIf="section.SectionTitle.length > 0">{{ section.SectionTitle }}</h3>

              <ng-container *rxFor="let question of section.Questions" [ngSwitch]="section.SectionQuestiontype">
                <label-summary *ngSwitchCase="QuestionType.Label" [question]="question" />
                <checkbox-summary *ngSwitchCase="QuestionType.Checkbox" [question]="question" />
                <radio-group-summary *ngSwitchCase="QuestionType.RadioGroup" [section]="section" [question]="question" />
                <textbox-summary *ngSwitchCase="QuestionType.Textbox" [question]="question" />
                <textbox-summary *ngSwitchCase="QuestionType.TextArea" [question]="question" />
                <select-summary *ngSwitchCase="QuestionType.Select" [question]="question" />
                <checkbox-textbox-summary *ngSwitchCase="QuestionType.CheckboxTextbox" [question]="question" />
                <radio-group-textbox-summary *ngSwitchCase="QuestionType.RadioGroupTextbox" [section]="section" [question]="question" />
                <date-summary *ngSwitchCase="QuestionType.Date" [question]="question" />
                <datetime-summary *ngSwitchCase="QuestionType.DateTime" [question]="question" />
                <operative-list-summary *ngSwitchCase="QuestionType.OperativeList" [question]="question" />
                <number-summary *ngSwitchCase="QuestionType.Number" [question]="question" />
                <cascade-select-summary *ngSwitchCase="QuestionType.CascadeDropdown" [question]="question" />
                <linked-bool-summary *ngSwitchCase="QuestionType.LinkedBool" [section]="section" [question]="question" />
                <asset-list-summary *ngSwitchCase="QuestionType.AssetList" [question]="question" />
                <linked-dates-summary *ngSwitchCase="QuestionType.LinkedDates" [question]="question" />
                <signature-summary *ngSwitchCase="QuestionType.Signature" [question]="question" />
                <select-summary *ngSwitchCase="QuestionType.CompanySelect" [question]="question" />
                <cascade-select-summary *ngSwitchCase="QuestionType.AreaSelect" [question]="question" />
                <select-summary *ngSwitchCase="QuestionType.AssetGroupsAndTypes" [question]="question" />
                <select-summary *ngSwitchCase="QuestionType.AssetInspectionSchedule" [question]="question" />
                <select-summary *ngSwitchCase="QuestionType.ProjectSelect" [question]="question" />
                <select-summary *ngSwitchCase="QuestionType.RamsSelect" [question]="question" />
                <select-text-summary *ngSwitchCase="QuestionType.SelectText" [question]="question" />
                <cascade-select-text-summary *ngSwitchCase="QuestionType.CascadeDropdownText" [question]="question" />
                <time-summary *ngSwitchCase="QuestionType.Time" [question]="question" />
                <linked-times-summary *ngSwitchCase="QuestionType.LinkedTimes" [question]="question" />
                <linked-date-time-summary *ngSwitchCase="QuestionType.LinkedDateAndTime" [question]="question" />
              </ng-container>
            </ng-container>
          </ng-container>

          <remain-anonymous-summary *rxIf="document.RemainAnon" [isTicked]="document.RemainAnon" />
        </ion-content>

        <ion-footer>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button (click)="modal.dismiss()" color="danger" expand="full">Cancel</ion-button>
              </ion-col>
              <ion-col>
                <ion-button (click)="submit.emit(); modal.dismiss();" expand="full">Submit</ion-button>
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
    ...importInputSummaries(),
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