import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { DatetimePickerComponent } from "src/app/shared/components/datetime-picker/datetime-picker.component";
import { QuestionTextComponent } from "../extras";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";
import { using } from "src/app/shared/rxjs";
import { addHours, subHours } from "date-fns";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "date-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
      </ion-item>
      <datetime-picker 
        [(datetime)]="question.DateAndTime" 
        presentation="date"
        [min]="minDate() | push"
        [max]="maxDate() | push" />
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
export class DateComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  @Input({ required: true })
  question!: Question;

  minRule = using(this.afterViewInit(), this.input("question"))
    .calculate(() => this.question.ValidationData.find(rule => rule.Key === "Min"));

  maxRule = using(this.afterViewInit(), this.input("question"))
    .calculate(() => this.question.ValidationData.find(rule => rule.Key === "Max"));

  minDate = this.minRule(min => min != null 
    ? subHours(new Date(), +min.Value)
    : null
  );

  maxDate = this.maxRule(max => max != null
    ? addHours(new Date(), +max.Value)
    : null
  );
}
