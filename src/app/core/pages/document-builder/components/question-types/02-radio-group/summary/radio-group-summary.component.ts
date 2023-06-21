import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question, Section } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "radio-group-summary",
  template: `
    <ion-list>
      <ion-item lines="none">
        <b class="whitespace-normal">{{ question.QuestionText }}</b>
      </ion-item>
      <ion-item lines="none">
        <ng-container *rxIf="question.YesNoNA">
          <span *rxIf="section.TableTitles[0]">{{ section.TableTitles[0] }}</span>
          <ion-icon name="checkmark-circle" color="success" />
        </ng-container>

        <ng-container *rxIf="question.YesNoNA === false">
          <span *rxIf="section.TableTitles[1]">{{ section.TableTitles[1] }}</span>
        <ion-icon name="close-circle" color="danger" />
        </ng-container>

        <ng-container *rxIf="question.YesNoNA == null" >
          <span *rxIf="section.TableTitles[2]">{{ section.TableTitles[2] }}</span>
          <ion-icon name="remove-circle" color="secondary" />
        </ng-container>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, ...importRxTemplate()]
})
export class RadioGroupSummaryComponent {
  @Input({ required: true })
  question!: Question;

  @Input({ required: true })
  section!: Section;
}
