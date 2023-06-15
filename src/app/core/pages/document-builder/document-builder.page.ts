import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { IfComponent, ToggleButtonComponent } from "src/app/shared/components";
import { importNgSwitch, importRxTemplate } from "src/app/shared/imports";
import { DocumentNavigationComponent, DocumentPageComponent, DocumentSectionComponent, QuestionsTemplateDirective, importInfoTypes, importInputTypes, importQuestionTypes } from "./components";
import { QuestionType } from "../../stores/site-document/models";
import { isMobileApp } from "src/app/shared/plugins/platform.plugin";
import { importDocumentBuilderModals } from "./modals";
import { useTemplate } from "../../http/template.api";
import { param, param$, useGoRelative } from "src/app/shared/route";

interface DocumentBuilderOptions {
  inSinglePageMode: boolean
}

@Component({
  selector: 'app-document-builder',
  template: `
    <ion-header>
      <ion-toolbar *rxIf="document.data(); let document">
        <ion-buttons slot="start">
          <ion-button>
            <ion-icon name="arrow-back-outline" />
          </ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center ion-text-wrap">
          {{ document.DocumentTitle }}
        </ion-title>
        <ion-buttons slot="end">
          <toggle-button [(checked)]="options.inSinglePageMode" icon="reader" />

          <toggle-button 
            *rxIf="isMobileApp" 
            [(checked)]="document.Pinned" 
            icon="bookmark" />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content *rxIf="document.data(); let document" class="ion-padding">
      <require-gps *rxIf="document.ReqGps" />

      <actioner-select
         *rxIf="document.CanAddActionerFromApp"
         [(actionerId)]="document.CurrentActionerOperativeID"
         [title]="document.MetaData.ActionerText"
         [hideMyself]="document.MetaData.CannotAddSelfAsActioner || false" />
      
      <category-actioner-select 
        *rxIf="document.CanAddCategoryActioner && document.DocumentCategory != null" 
        [title]="document.MetaData.ActionerText"
        [(actionerId)]="document.CurrentActionerOperativeID"
        [categoryId]="document.DocumentCategory"
        [hideMyself]="document.MetaData.CannotAddSelfAsActioner || false" />
      
      <company-actioner-select 
        *rxIf="document.CanHaveCompanyActioner"
        [title]="document.MetaData.ActionerText"
        [(companyId)]="document.CompanyActionerId" />
      
      <queue-select 
        *rxIf="document.Queues && document.Queues.length > 0"
        [queueId]="document.AutoQueueID" />
      
      <site-select 
        *rxIf="document.MetaData?.HasSiteList"
        [title]="document.MetaData.SiteListTitle"
        [(siteId)]="document.SiteId" />
      
      <queue-duration *rxIf="document.CanHaveQueueDuration" />

      <document-page *rxFor="let page of document.Pages; index as idx" [page]="page" [hidden]="!options.inSinglePageMode && document.PageIdx !== page.PageNo">
        <document-section *rxFor="let section of page.Sections" [section]="section">
          <ng-template [ngSwitch]="section.SectionQuestiontype" [questions]="section.Questions" let-question>
            <label-question *ngSwitchCase="QuestionType.Label" [question]="question" />
            <checkbox-question *ngSwitchCase="QuestionType.Checkbox" [question]="question" />
            
            <if *ngSwitchCase="QuestionType.RadioGroup" [condition]="document.MetaData.UsesRadioGroupTable === true">
              <radio-table-question show [question]="question" />
              <radio-group-question else [section]="section" [question]="question" />
            </if>

            <textarea-question *ngSwitchCase="QuestionType.TextArea" [question]="question" />
            <select-question *ngSwitchCase="QuestionType.Select" [question]="question" />
            <checkbox-question *ngSwitchCase="QuestionType.CheckboxTextbox" [question]="question" />

            <if *ngSwitchCase="QuestionType.RadioGroupTextbox" [condition]="document.MetaData.UsesRadioGroupTable === true">
              <radio-table-textbox-question show [question]="question" />
              <radio-group-textbox-question else [question]="question" [section]="section" />
            </if>

            <date-question *ngSwitchCase="QuestionType.Date" [question]="question" />
            <datetime-question *ngSwitchCase="QuestionType.DateTime" [question]="question" />
            <operative-list-question *ngSwitchCase="QuestionType.OperativeList" [question]="question" />
            <number-question *ngSwitchCase="QuestionType.Number" [question]="question" />
            <asset-list-question *ngSwitchCase="QuestionType.AssetList" [question]="question" />
            <linked-dates-question *ngSwitchCase="QuestionType.LinkedDates" [question]="question" />
            <signature-question *ngSwitchCase="QuestionType.Signature" [question]="question" />
            <company-select-question *ngSwitchCase="QuestionType.CompanySelect" [question]="question" />
            <area-select-question *ngSwitchCase="QuestionType.AreaSelect" [question]="question" />
            <asset-groups-and-types-question *ngSwitchCase="QuestionType.AssetGroupsAndTypes" [question]="question" />
            <select-text-question *ngSwitchCase="QuestionType.SelectText" [question]="question" />
            <time-question *ngSwitchCase="QuestionType.Time" [question]="question" />
            <linked-times-question *ngSwitchCase="QuestionType.LinkedTimes" [question]="question" />
            <hra-select-question *ngSwitchCase="QuestionType.HraSelect" [question]="question" />
            <linked-datetime-question *ngSwitchCase="QuestionType.LinkedDateAndTime" [question]="question" />
          </ng-template>
        </document-section>
      </document-page>

      <remain-anonymous *rxIf="document.AllowAnon" [(isTicked)]="document.RemainAnon" />

      <ion-button *rxIf="options.inSinglePageMode || document.PageIdx === (document.Pages.length - 1)" class="ion-margin-vertical" expand="full">
        Submit
      </ion-button>
    </ion-content>

    <ng-container *rxIf="document.data(); let doc">
      <ion-footer *rxIf="!options.inSinglePageMode && doc.Pages.length > 0">
        <document-navigation [pages]="doc.Pages" [(index)]="doc.PageIdx" />
      </ion-footer>
    </ng-container>

    <template-menu-modal 
      *rxLet="id$; let id" 
      [isOpen]="id == null"
      (select)="goRelative({ 
        queryParams: { id: $event },
        queryParamsHandling: 'merge',
        skipLocationChange: true 
      })" />
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    ...importNgSwitch(),
    IfComponent,
    ToggleButtonComponent,
    DocumentNavigationComponent,
    DocumentPageComponent,
    DocumentSectionComponent,
    QuestionsTemplateDirective,
    ...importInfoTypes(),
    ...importInputTypes(),
    ...importQuestionTypes(),
    ...importDocumentBuilderModals()
  ]
})
export class DocumentBuilderPage {
  QuestionType = QuestionType;
  isMobileApp = isMobileApp();
  goRelative = useGoRelative();
  

  options: DocumentBuilderOptions = {
    inSinglePageMode: false
  }

  id$ = param$("id", id => id?.toNumber());
  queueId = param("queueId")?.toNumber();

  document = useTemplate(this.id$);
}
