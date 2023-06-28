import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { merge } from "rxjs";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { FormsModule } from "@angular/forms";
import { useCheckboxValidator } from "./validation/checkbox.validator";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";
import { createEffect } from "src/app/shared/rxjs";

@Component({
  selector: 'checkbox-question',
  template: `
    <ion-item lines="none">
      <ion-checkbox 
        [class.ng-invalid]="validator.isInvalid$ | push" 
        [class.ng-valid]="validator.isValid$ | push"
        [(ngModel)]="question.YesNoNA" 
        (ionChange)="validator.validate()" 
        aria-label="" 
        slot="start" />
      <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
      <camera-capture *rxIf="question.CanHaveImg" class="m-0" slot="end" />
      <file-upload *rxIf="question.CanHaveFiles" class="m-0" slot="end" />
    </ion-item>
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
export class CheckboxComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  @Input({ required: true })
  question!: Question;

  validator = useCheckboxValidator(() => this.question);
  
  effects = [
    createEffect(
      () => this.validator.validate(),
      merge(this.afterViewInit(), this.input("question"))
    )
  ];
}
