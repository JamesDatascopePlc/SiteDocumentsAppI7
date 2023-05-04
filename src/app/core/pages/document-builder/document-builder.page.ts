import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { IonicModule } from "@ionic/angular";
import { filter, merge, shareReplay, switchMap } from "rxjs";
import { IfComponent } from "src/app/shared/components";
import { importNgSwitch, importRxTemplate } from "src/app/shared/imports";
import { AngularComponent } from "src/app/shared/lifecycles";
import { FormFillerStore } from "../../stores/site-document/form-filler/form-filler.store";
import { DocumentPageComponent, DocumentSectionComponent, QuestionTemplateDirective, importInputTypes, importQuestionTypes } from "./components";
import { FormFillerRoute } from "./routes";
import { clickReaction, reaction } from "src/app/shared/reactions";
import { TemplateMenuModal } from "./modals";
import { QuestionType, SiteDocument } from "../../stores/site-document/models";
import { isMobileApp } from "src/app/shared/plugins/platform.plugin";
import { numberAdapter } from "src/app/shared/adapters/number.adapter";

@Component({
  selector: 'app-document-builder',
  template: `
    <ion-header>
      <ion-toolbar *rxIf="document$; let document">
        <ion-title class="ion-text-center ion-text-wrap">
          {{ document.DocumentTitle }}
        </ion-title>
        <ion-buttons *rxIf="isMobileApp" slot="end">
          <if [condition]="document.Pinned">
            <ion-button [unpatch] show color="primary">
              <ion-icon name="bookmark"></ion-icon>
            </ion-button>

            <ion-button [unpatch] else>
              <ion-icon name="bookmark-outline"></ion-icon>
            </ion-button>
          </if>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content *rxIf="document$; let document" class="ion-padding">
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

      <document-page *rxFor="let page of document.Pages; index as idx" [page]="page" [hidden]="pageIndex.isNotNumber$(idx) | push">
        <document-section *rxFor="let section of page.Sections" [section]="section">
          <ng-template [ngSwitch]="section.SectionQuestiontype" [questions]="section.Questions" let-question>
            <label-question *ngSwitchCase="QuestionType.Label" [question]="question" />
            <checkbox-question *ngSwitchCase="QuestionType.Checkbox" [question]="question" />
            <radio-group-question *ngSwitchCase="QuestionType.RadioGroup" [section]="section" [question]="question" />
            <radio-table-question 
              *rxIf="section.SectionQuestiontype === QuestionType.RadioGroup && document.MetaData.UsesRadioGroupTable" 
              [question]="question" />
            <textarea-question *ngSwitchCase="QuestionType.TextArea" [question]="question" />
            <select-question *ngSwitchCase="QuestionType.Select" [question]="question" />
            <checkbox-question *ngSwitchCase="QuestionType.CheckboxTextbox" [question]="question" />
            <radio-group-textbox-question *ngSwitchCase="QuestionType.RadioGroupTextbox" [question]="question" [section]="section" />
            <radio-table-textbox-question 
              *rxIf="section.SectionQuestiontype === QuestionType.RadioGroupTextbox && document.MetaData.UsesRadioGroupTable" 
              [question]="question" />
            <date-question *ngSwitchCase="QuestionType.Date" [question]="question" />
            <datetime-question *ngSwitchCase="QuestionType.DateTime" [question]="question" />
            <operative-list-question *ngSwitchCase="QuestionType.OperativeList" [question]="question" />
            <number-question *ngSwitchCase="QuestionType.Number" [question]="question" />
            <asset-list-question *ngSwitchCase="QuestionType.AssetList" [question]="question" />
            <linked-dates-question *ngSwitchCase="QuestionType.LinkedDates" [question]="question" />
            <signature-question *ngSwitchCase="QuestionType.Signature" [question]="question" />
            <select-text-question *ngSwitchCase="QuestionType.SelectText" [question]="question" />
            <time-question *ngSwitchCase="QuestionType.Time" [question]="question" />
          </ng-template>
        </document-section>
      </document-page>

      <remain-anonymous *rxIf="document.AllowAnon" [(isTicked)]="document.RemainAnon" />

      <ion-button
        (click)="submit(document)"
        [unpatch] 
        class="ion-margin-vertical" 
        expand="full">
        Submit
      </ion-button>
    </ion-content>

    <ng-container *rxIf="document$; let document">
      <ion-footer *rxLet="pageIndex.value$; let idx">
        <ion-button 
          *rxIf="idx > 0" 
          (click)="pageIndex.decrement()"
          class="float-left">
          Back
        </ion-button>
        <ion-button 
          *rxIf="idx < document.Pages.length" 
          (click)="pageIndex.increment()"
          class="float-right">
          Next
        </ion-button>
      </ion-footer>
    </ng-container>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    ...importNgSwitch(),
    IfComponent,
    DocumentPageComponent,
    DocumentSectionComponent,
    QuestionTemplateDirective,
    ...importInputTypes(),
    ...importQuestionTypes(),
    TemplateMenuModal
  ]
})
export class DocumentBuilderPage extends AngularComponent() {
  protected readonly formFillerRoute = inject(FormFillerRoute);
  protected readonly formFillerStore = inject(FormFillerStore);

  QuestionType = QuestionType;
  isMobileApp = isMobileApp();

  document$ = merge(
    this.formFillerStore.getTemplateRequest$(this.formFillerRoute.lastDocumentId$),
  ).pipe(
    switchMap(() => this.formFillerStore.writingDocument$),
    shareReplay()
  );

  submit = reaction<SiteDocument>(document$ => this.formFillerStore.submitDocument$(document$).pipe(
    takeUntilDestroyed(),
    clickReaction()
  ));

  pageIndex = {
    ...numberAdapter("PageIndex", 0),
    isNotNumber$: (page: number) => this.pageIndex.is$(idx => idx !== page),
    isGreaterThan0$: () => this.pageIndex.is$(idx => idx > 0),
    isLessThanDocumentLength$: () => this.document$.pipe(
      filter(doc => doc != null),
      switchMap(doc => this.pageIndex.is$(idx => idx < doc!.Pages.length))
    )
  };
}
