import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Subject } from "rxjs";
import { IfComponent } from "src/app/shared/components";
import { importNgSwitch, importRxTemplate } from "src/app/shared/imports";
import { AngularComponent, withAfterViewInit } from "src/app/shared/lifecycles";
import { QuestionType, SiteDocument } from "../../stores/site-document/site-document.store";
import { DocumentPageComponent, DocumentSectionComponent, DocumentPageNavigationComponent, QuestionTemplateDirective, importInputTypes, importQuestionTypes } from "./components";

export interface DocumentBuilderPageParams {
  documentId: number;
  specificId: number;
}

@Component({
  selector: 'app-document-builder',
  template: `
    <ion-header>
      <ion-toolbar *rxIf="document$; let document">
        <ion-title class="ion-text-center ion-text-wrap">
          {{ document.DocumentTitle }}
        </ion-title>
        <ion-buttons slot="end">
          <if [condition]="document.Pinned">
            <ion-button show color="primary">
              <ion-icon name="bookmark"></ion-icon>
            </ion-button>

            <ion-button else>
              <ion-icon name="bookmark-outline"></ion-icon>
            </ion-button>
          </if>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content *rxIf="document$; let document" class="ion-padding">
      <actioner-select></actioner-select>
      <company-actioner-select></company-actioner-select>
      <queue-duration></queue-duration>
      <queue-select></queue-select>

      <document-page *rxFor="let page of document.Pages; index as idx" [page]="page">
        <document-section *rxFor="let section of page.Sections" [section]="section">
          <ng-template [ngSwitch]="section.SectionQuestiontype" [questions]="section.Questions" let-question>
            <label-question *ngSwitchCase="QuestionType.Label" [question]="question"></label-question>
            <checkbox-question *ngSwitchCase="QuestionType.Checkbox" [question]="question"></checkbox-question>
            <radio-group-question *ngSwitchCase="QuestionType.RadioGroup" [section]="section" [question]="question"></radio-group-question>
            <textarea-question *ngSwitchCase="QuestionType.TextArea" [question]="question"></textarea-question>
            <date-question *ngSwitchCase="QuestionType.Date" [question]="question"></date-question>
            <datetime-question *ngSwitchCase="QuestionType.DateTime" [question]="question"></datetime-question>
            <operative-list-question *ngSwitchCase="QuestionType.OperativeList" [question]="question"></operative-list-question>
            <number-question *ngSwitchCase="QuestionType.Number" [question]="question"></number-question>
            <asset-list-question *ngSwitchCase="QuestionType.AssetList" [question]="question"></asset-list-question>
            <time-question *ngSwitchCase="QuestionType.Time" [question]="question"></time-question>
          </ng-template>
        </document-section>
      </document-page>

      <remain-anonymous></remain-anonymous>

      <ion-button class="ion-margin-vertical" expand="full">
        Submit
      </ion-button>
    </ion-content>

    <ion-footer>
      <ion-button class="float-left">Back</ion-button>
      <ion-button class="float-right">Next</ion-button>
    </ion-footer>
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
    DocumentPageNavigationComponent,
    QuestionTemplateDirective,
    ...importInputTypes(),
    ...importQuestionTypes()
  ]
})
export class DocumentBuilderPage extends AngularComponent(withAfterViewInit) {
  QuestionType = QuestionType;

  document$ = new Subject<SiteDocument>();
}
