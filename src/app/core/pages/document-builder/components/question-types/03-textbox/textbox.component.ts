import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { useValidator } from "src/app/shared/validation";
import { TextboxValidator } from "./validation/textbox-validator";

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
          [class.ng-invalid]="validator.isInvalid()" 
          [class.ng-valid]="!validator.isInvalid()"
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
export class TextboxComponent {
  @Input({ required: true })
  question!: Question;

  validator = useValidator({
    validator: new TextboxValidator(),
    value: () => this.question
  });

  ngAfterViewInit() {
    this.validator.validate();
  }
}
