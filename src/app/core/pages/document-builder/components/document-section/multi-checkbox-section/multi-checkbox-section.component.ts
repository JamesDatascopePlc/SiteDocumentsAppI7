import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate, importRxVirtualScroll } from "src/app/shared/imports";
import { CheckboxComponent } from "../../question-types/01-checkbox/checkbox.component";
import { FusePipe } from "src/app/shared/pipes";
import { Question, Section } from "src/app/core/stores/site-document/models";
import { BehaviorSubject, map } from "rxjs";
import { AutoSizeVirtualScrollStrategy, FixedSizeVirtualScrollStrategy } from "@rx-angular/template/experimental/virtual-scrolling";

@Component({
  selector: "multi-checkbox-section",
  template: `
    <ion-list>
      <ion-item [id]="id" detail="false" button>
        <ion-label>{{ section.TableTitles[0] }}</ion-label>
        <ion-icon name="create-outline" slot="end"></ion-icon>
      </ion-item>
    </ion-list>

    <ion-list>
      <ion-item *rxFor="let question of selectedQuestions$" class="w-full">
        {{ question.QuestionText }}
      </ion-item>
    </ion-list>

    <ion-modal #modal [trigger]="id">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title class="text-center">Select Responses</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="modal.dismiss(); questions$.next(section.Questions)">
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
    ...importRxVirtualScroll(FixedSizeVirtualScrollStrategy, AutoSizeVirtualScrollStrategy),
    FormsModule,
    CheckboxComponent,
    FusePipe
  ]
})
export class MultiCheckboxSectionComponent {
  id = crypto.randomUUID();

  @Input({ required: true })
  section!: Section;

  searchValue: string = "";

  questions$ = new BehaviorSubject<Question[]>([]);
  selectedQuestions$ = this.questions$.pipe(
    map(questions => questions.filter(q => q.YesNoNA))
  );
}
