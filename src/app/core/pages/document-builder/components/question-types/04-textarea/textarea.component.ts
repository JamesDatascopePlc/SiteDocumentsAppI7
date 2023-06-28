import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { FormsModule } from "@angular/forms";
import { useTextboxValidator } from "../03-textbox/validation/textbox-validator";
import { createEffect } from "src/app/shared/rxjs";
import { merge } from "rxjs";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";

@Component({
  selector: "textarea-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">
          {{ question.QuestionText }}
        </question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="m-0" slot="end" />
        <file-upload *rxIf="question.CanHaveFiles" class="m-0" slot="end" />
      </ion-item>
      <ion-textarea class="p-2" label="" rows="6" fill="outline" [(ngModel)]="question.AnswerText" />
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    FormsModule,
    ...importRxTemplate(),
    QuestionTextComponent,
    CameraCaptureComponent,
    FileUploadComponent
  ]
})
export class TextareaComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  @Input({ required: true })
  question!: Question;

  validator = useTextboxValidator(() => this.question);

  effects = [
    createEffect(
      () => this.validator.validate(),
      merge(this.afterViewInit(), this.input("question"))
    )
  ];
}
