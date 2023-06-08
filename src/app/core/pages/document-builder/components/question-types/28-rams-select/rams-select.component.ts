import { ChangeDetectionStrategy, Component, Input, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { SelectableComponent } from "src/app/shared/components";
import { memoize } from "lodash-es";
import { LoginApi, RamsItem } from "src/app/core/http/login.api";
import { track } from "src/app/shared/rxjs";
import { Track } from "src/app/shared/rxjs/track";

@Component({
  selector: "rams-select-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="ion-no-margin" slot="end" />
        <file-upload *rxIf="question.CanHaveFiles" class="ion-no-margin" slot="end" />
      </ion-item>
      <selectable 
        placeholder="Select"
        [title]="question.QuestionText"
        [items]="rams.data() | push"
        itemText="Reference"
        [canClear]="!question.Required" />
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    QuestionTextComponent,
    SelectableComponent,
    CameraCaptureComponent,
    FileUploadComponent
  ]
})
export class RamsSelectComponent {
  @Input({ required: true })
  question!: Question;

  rams = useNotExpiredRams();
}

const useRams = memoize(() => {
  const loginApi = inject(LoginApi);

  return track(() => loginApi.getRams());
});

const useNotExpiredRams = memoize(() => {
  const rams = useRams();

  return {
    ...rams,
    data: rams.data(items => items.filter(item => item.ExpiryDate == null || item.ExpiryDate.isEqualOrAfterToday()))
  } as Track<RamsItem[]>
});