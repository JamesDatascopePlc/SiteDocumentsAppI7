import { ChangeDetectionStrategy, Component, Injectable, Input, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { SelectableComponent } from "src/app/shared/components";
import { Question } from "src/app/core/stores/site-document/models";
import { track } from "src/app/shared/rxjs/track";
import { LoginApi } from "src/app/core/http/login.api";
import { memoize } from "lodash-es";

@Component({
  selector: "area-select-question",
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
        [items]="areas.data() | push"
        itemText="Name"
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
export class AreaSelectComponent {
  @Input({ required: true })
  question!: Question;
  
  areas = useAreas();
}

@Injectable({
  providedIn: "root"
})
class AreaService {
  loginApi = inject(LoginApi);
  
  useAreas = memoize(() => track(() => this.loginApi.getAreas()).fire());
}

export function useAreas() {
  const svc = inject(AreaService);
  return svc.useAreas();
}