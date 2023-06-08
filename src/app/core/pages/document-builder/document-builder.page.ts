import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { IonicModule } from "@ionic/angular";
import { filter, merge, shareReplay, switchMap } from "rxjs";
import { IfComponent } from "src/app/shared/components";
import { importNgSwitch, importRxTemplate } from "src/app/shared/imports";
import { FormFillerStore } from "../../stores/site-document/form-filler/form-filler.store";
import { DocumentPageComponent, DocumentSectionComponent, QuestionsTemplateDirective, importInputTypes, importQuestionTypes } from "./components";
import { clickReaction, reaction } from "src/app/shared/reactions";
import { QuestionType, SiteDocument } from "../../stores/site-document/models";
import { isMobileApp } from "src/app/shared/plugins/platform.plugin";
import { numberState } from "src/app/shared/states/number.state";
import { DocumentBuilderRoute } from "./document-builder.route";
import { importDocumentBuilderModals } from "./modals";
import { ActivatedRoute, Router } from "@angular/router";

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
              <ion-icon name="bookmark" />
            </ion-button>

            <ion-button [unpatch] else>
              <ion-icon name="bookmark-outline" />
            </ion-button>
          </if>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content *rxIf="document$; let document" class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label>
            Show document as single page
          </ion-label>
          <ion-toggle></ion-toggle>
        </ion-item>
      </ion-list>

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
          *rxIf="idx < document.Pages.length - 1" 
          (click)="pageIndex.increment()"
          class="float-right">
          Next
        </ion-button>
      </ion-footer>
    </ng-container>

    <template-menu-modal [isOpen]="route.noParams$ | push" (select)="navigateDocument($event)" />
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
    QuestionsTemplateDirective,
    ...importInputTypes(),
    ...importQuestionTypes(),
    ...importDocumentBuilderModals()
  ]
})
export class DocumentBuilderPage {
  protected readonly router = inject(Router);
  _route = inject(ActivatedRoute);
  protected readonly route = inject(DocumentBuilderRoute);
  protected readonly formFillerStore = inject(FormFillerStore);

  QuestionType = QuestionType;
  isMobileApp = isMobileApp();

  document$ = merge(
    this.formFillerStore.getTemplateRequest$(this.route.lastDocumentId$),
  ).pipe(
    switchMap(() => this.formFillerStore.writingDocument$),
    shareReplay()
  );

  navigateDocument(id: number) {
    this.router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        ids: [id]
      },
      queryParamsHandling: "merge",
      skipLocationChange: true
    });
  }

  submit = reaction<SiteDocument>(doc$ => this.formFillerStore.submitDocument$(doc$()).pipe(
    takeUntilDestroyed(),
    clickReaction()
  ));

  pageIndex = numberState({
    name: "PageIndex",
    initialValue: 0,
    props: state => ({
      isNotNumber$: (page: number) => state.is$(idx => idx !== page),
      isGreaterThan0$: () => state.is$(idx => idx > 0),
      isLessThanDocumentLength$: () => this.document$.pipe(
        filter(doc => doc != null),
        switchMap(doc => state.is$(idx => idx < doc!.Pages.length))
      )
    })
  })
}
