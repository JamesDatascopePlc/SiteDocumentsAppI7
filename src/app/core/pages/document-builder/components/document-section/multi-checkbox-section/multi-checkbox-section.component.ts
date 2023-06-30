import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate, importRxVirtualScroll } from "src/app/shared/imports";
import { CheckboxComponent } from "../../question-types/01-checkbox/checkbox.component";
import { FusePipe } from "src/app/shared/pipes";
import { Section } from "src/app/core/stores/site-document/models";
import { FixedSizeVirtualScrollStrategy } from "@rx-angular/template/experimental/virtual-scrolling";
import { use } from "src/app/shared/rxjs";
import { AngularComponent, withAfterViewInit } from "src/app/shared/lifecycles";
import { merge } from "rxjs";

@Component({
  selector: "multi-checkbox-section",
  template: `
    <ion-list>
      <ion-item [id]="id" detail="false" button>
        <ion-label>{{ section.TableTitles[0] }}</ion-label>
        <ion-icon name="create-outline" slot="end"></ion-icon>
      </ion-item>
    </ion-list>

    <ion-list class="max-h-96" [style.height]="listHeight() | push">
      <rx-virtual-scroll-viewport [itemSize]="50">
        <ion-item *rxVirtualFor="let question of selectedQuestions()" class="w-full">
          {{ question.QuestionText }}
        </ion-item>
      </rx-virtual-scroll-viewport>
    </ion-list>

    <ion-modal #modal [trigger]="id">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title class="text-center">Select Responses</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="modal.dismiss(); saved.next()">
                <ion-icon name="close-outline" slot="icon-only" />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
          <ion-toolbar>
            <ion-searchbar 
              [(ngModel)]="searchValue"
              debounce="300" 
              placeholder="Search" />
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list class="h-full">
            <rx-virtual-scroll-viewport [itemSize]="50">
              <checkbox-question 
                *rxVirtualFor="let question of section.Questions
                  | fuse: {
                    search: searchValue,
                    keys: ['QuestionText']
                  }" 
                class="w-full"
                [question]="question" />
            </rx-virtual-scroll-viewport>
          </ion-list>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    ...importRxVirtualScroll(FixedSizeVirtualScrollStrategy),
    FormsModule,
    CheckboxComponent,
    FusePipe
  ]
})
export class MultiCheckboxSectionComponent extends AngularComponent(withAfterViewInit) {
  id = crypto.randomUUID();

  @Input({ required: true })
  section!: Section;
  saved = use();

  questions = merge(this.afterViewInit(), this.saved())
    .map(() => this.section.Questions)
    .toPipe();

  searchValue: string = "";

  selectedQuestions = this.questions(questions => questions.filter(q => q.YesNoNA));
  listHeight = this.selectedQuestions(questions => (questions.length * 50) + "px");
}
