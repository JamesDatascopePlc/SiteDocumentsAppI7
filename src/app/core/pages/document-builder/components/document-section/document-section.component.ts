import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, ContentChild, Directive, Input, TemplateRef } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question, QuestionType, Section } from "src/app/core/stores/site-document/models";
import { IfComponent } from "src/app/shared/components";
import { importRxTemplate } from "src/app/shared/imports";
import { MultiCheckboxSectionComponent } from "./multi-checkbox-section/multi-checkbox-section.component";
import { AngularDirective, withTemplateContextGuard } from "src/app/shared/lifecycles";

@Directive({
  selector: "ng-template[questions]",
  standalone: true
})
export class QuestionsTemplateDirective extends AngularDirective(withTemplateContextGuard<Question>) {
  @Input()
  questions!: Question[];
}

@Component({
  selector: "document-section[section]",
  template: `
    <ion-label>{{ section.SectionTitle }}</ion-label>
    <ng-container *rxIf="section.IsRepeatable">
      <ion-button color="secondary" fill="clear">
        <ion-icon name="duplicate-outline" />
      </ion-button>
      <ion-button color="secondary" fill="clear">
        <ion-icon name="remove-circle-outline" />
      </ion-button>
    </ng-container>

    <if [condition]="section.SectionQuestiontype === QuestionType.MultiCheckbox">
      <multi-checkbox-section show [section]="section" />

      <ng-container else *rxFor="let question of section.Questions">
        <ng-container *ngTemplateOutlet="questionsTpl; context: { $implicit: question }" />
      </ng-container>
    </if>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    NgTemplateOutlet,
    IfComponent,
    MultiCheckboxSectionComponent,
    QuestionsTemplateDirective
  ]
})
export class DocumentSectionComponent {
  QuestionType = QuestionType;

  @Input()
  section!: Section;

  @ContentChild(QuestionsTemplateDirective, { read: TemplateRef }) 
  questionsTpl!: TemplateRef<unknown>;
}
