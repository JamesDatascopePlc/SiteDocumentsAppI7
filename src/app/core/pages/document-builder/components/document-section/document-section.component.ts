import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, ContentChild, Directive, Input, TemplateRef } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question, Section } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";

@Directive({
  selector: "ng-template[questions]",
  standalone: true
})
export class QuestionTemplateDirective {
  @Input()
  questions!: Question[];

  static ngTemplateContextGuard(dir: QuestionTemplateDirective, ctx: unknown): ctx is { $implicit: Question } {
    return true;
  }
}

@Component({
  selector: "document-section[section]",
  template: `
    <ion-label>{{ section.SectionTitle }}</ion-label>
    <ng-container *rxIf="section.IsRepeatable">
      <ion-button color="secondary" fill="clear">
        <ion-icon name="duplicate-outline"></ion-icon>
      </ion-button>
      <ion-button color="secondary" fill="clear">
        <ion-icon name="remove-circle-outline"></ion-icon>
      </ion-button>
    </ng-container>

    <ng-container *rxFor="let question of section.Questions">
      <ng-container *ngTemplateOutlet="questions; context: { $implicit: question }"></ng-container>
    </ng-container>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    NgTemplateOutlet,
    QuestionTemplateDirective
  ]
})
export class DocumentSectionComponent {
  @Input()
  section!: Section;

  @ContentChild(QuestionTemplateDirective, { read: TemplateRef }) 
  questions!: TemplateRef<unknown>;
}
