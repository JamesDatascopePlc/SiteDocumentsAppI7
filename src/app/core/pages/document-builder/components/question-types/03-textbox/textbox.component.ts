import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { merge } from "rxjs";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { useTextboxValidator } from "./validation/textbox-validator";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";
import { createEffect } from "src/app/shared/rxjs";

@Component({
  selector: "textbox-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="m-0" slot="end" />
        <file-upload *rxIf="question.CanHaveFiles" class="m-0" slot="end" />
      </ion-item>
      <ion-item>
        <ion-input
          [class.ng-invalid]="validator.isInvalid$ | push" 
          [class.ng-valid]="validator.isValid$ | push"
          label="" 
          type="text" 
          [(ngModel)]="question.AnswerText"
          (keyup)="validator.validate()" />
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    FormsModule,
    ReactiveFormsModule,
    QuestionTextComponent,
    CameraCaptureComponent,
    FileUploadComponent
  ]
})
export class TextboxComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
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
