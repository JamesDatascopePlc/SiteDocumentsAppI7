import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { Question, Section } from "src/app/core/stores/site-document/models";
import { FormsModule } from "@angular/forms";
import { useRadioGroupValidator } from "./validation/radio-group.validator";
import { createEffect } from "src/app/shared/rxjs";
import { merge } from "rxjs";
import { AngularComponent, withAfterViewInit, withOnChanges } from "src/app/shared/lifecycles";

@Component({
  selector: "radio-group-question",
  template: `
    <ion-list>
      <ion-item 
        [class.ion-invalid]="validator.isInvalid$ | push" 
        [class.ion-valid]="validator.isValid$ | push"
        class="ion-no-padding" 
        lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="m-0" slot="end" />
        <file-upload *rxIf="question.CanHaveFiles" class="m-0" slot="end" />
      </ion-item>
    </ion-list>

    <ion-radio-group [(ngModel)]="question.YesNoNA" (ngModelChange)="validator.validate()">
      <ion-list>
        <ion-item>
          <ion-radio color="success" [value]="true">{{ section.TableTitles[0] || "" }}</ion-radio>
        </ion-item>

        <ion-item>
          <ion-radio color="danger" [value]="false">{{ section.TableTitles[1] || "" }}</ion-radio>
        </ion-item>

        <ion-item>
          <ion-radio [value]="null">{{ section.TableTitles[2] || "" }}</ion-radio>
        </ion-item>
      </ion-list>
    </ion-radio-group>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    FormsModule,
    QuestionTextComponent,
    CameraCaptureComponent,
    FileUploadComponent
  ]
})
export class RadioGroupComponent extends AngularComponent(withAfterViewInit, withOnChanges) {
  @Input({ required: true })
  section!: Section;
  
  @Input({ required: true })
  question!: Question;

  validator = useRadioGroupValidator(() => this.question);

  effects = [
    createEffect(
      () => this.validator.validate(),
      merge(this.afterViewInit(), this.input("question"))
    )
  ];
}
