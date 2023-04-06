import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { merge, shareReplay, switchMap } from "rxjs";
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
      <actioner-select *rxIf="document.CanAddActionerFromApp"></actioner-select>
      <company-actioner-select *rxIf="document.CanHaveCompanyActioner"></company-actioner-select>
      <queue-select *rxIf="document.Queues && document.Queues.length > 0"></queue-select>
      <queue-duration *rxIf="document.CanHaveQueueDuration"></queue-duration>

      <document-page *rxFor="let page of document.Pages; index as idx" [page]="page">
        <document-section *rxFor="let section of page.Sections" [section]="section">
          <ng-template [ngSwitch]="section.SectionQuestiontype" [questions]="section.Questions" let-question>
            <label-question *ngSwitchCase="QuestionType.Label" [question]="question"></label-question>
            <checkbox-question *ngSwitchCase="QuestionType.Checkbox" [question]="question"></checkbox-question>
            <radio-group-question *ngSwitchCase="QuestionType.RadioGroup" [section]="section" [question]="question"></radio-group-question>
            <radio-table-question 
              *rxIf="section.SectionQuestiontype === QuestionType.RadioGroup && document.MetaData.UsesRadioGroupTable" 
              [question]="question">
            </radio-table-question>
            <textarea-question *ngSwitchCase="QuestionType.TextArea" [question]="question"></textarea-question>
            <select-question *ngSwitchCase="QuestionType.Select" [question]="question"></select-question>
            <checkbox-question *ngSwitchCase="QuestionType.CheckboxTextbox" [question]="question"></checkbox-question>
            <radio-group-textbox-question *ngSwitchCase="QuestionType.RadioGroupTextbox" [question]="question"></radio-group-textbox-question>
            <radio-table-textbox-question 
              *rxIf="section.SectionQuestiontype === QuestionType.RadioGroupTextbox && document.MetaData.UsesRadioGroupTable" 
              [question]="question">
            </radio-table-textbox-question>
            <date-question *ngSwitchCase="QuestionType.Date" [question]="question"></date-question>
            <datetime-question *ngSwitchCase="QuestionType.DateTime" [question]="question"></datetime-question>
            <operative-list-question *ngSwitchCase="QuestionType.OperativeList" [question]="question"></operative-list-question>
            <number-question *ngSwitchCase="QuestionType.Number" [question]="question"></number-question>
            <asset-list-question *ngSwitchCase="QuestionType.AssetList" [question]="question"></asset-list-question>
            <linked-dates-question *ngSwitchCase="QuestionType.LinkedDates" [question]="question"></linked-dates-question>
            <signature-question *ngSwitchCase="QuestionType.Signature" [question]="question"></signature-question>
            <select-text-question *ngSwitchCase="QuestionType.SelectText" [question]="question"></select-text-question>
            <time-question *ngSwitchCase="QuestionType.Time" [question]="question"></time-question>
          </ng-template>
        </document-section>
      </document-page>

      <remain-anonymous 
        *rxIf="document.AllowAnon"
        [(isTicked)]="document.RemainAnon">
      </remain-anonymous>

      <ion-button
        (click)="submit(document)"
        [unpatch] 
        class="ion-margin-vertical" 
        expand="full">
        Submit
      </ion-button>
    </ion-content>

    <ng-container *rxIf="document$; let document">
      <ion-footer *rxIf="document.Pages.length > 1">
        <ion-button [unpatch] class="float-left">Back</ion-button>
        <ion-button [unpatch] class="float-right">Next</ion-button>
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
    this.takeUntilDestroyed(),
    clickReaction()
  ));
}
