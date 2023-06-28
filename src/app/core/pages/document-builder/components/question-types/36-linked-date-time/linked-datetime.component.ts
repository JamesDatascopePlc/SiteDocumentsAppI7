import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { QuestionTextComponent } from "../extras";
import { DatetimePickerComponent } from "src/app/shared/components";
import { merge } from "rxjs";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";
import { maxDate, minDate, spreadDate } from "src/app/core/stores/site-document/models/site-document.model";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "linked-datetime-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
      </ion-item>
      <datetime-picker 
        [(datetime)]="question.DateAndTime"
        [min]="min() | push"
        [max]="spread() | push" />

      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.CascadeOptionsText }}</question-text>
      </ion-item>
      <datetime-picker 
        [(datetime)]="question.DateAndTime2"
        [min]="min() | push"
        [max]="max() | push" />
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    QuestionTextComponent,
    DatetimePickerComponent
  ]
})
export class LinkedDatetimeComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  @Input({ required: true })
  question!: Question;
  question$ = merge(this.afterViewInit(), this.input("question")).toPipe();

  min = this.question$(() => minDate(this.question));
  max = this.question$(() => maxDate(this.question));
  spread = this.question$(() => spreadDate(this.question));
}
