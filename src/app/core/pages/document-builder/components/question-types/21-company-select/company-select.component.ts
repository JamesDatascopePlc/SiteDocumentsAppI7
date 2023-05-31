import { ChangeDetectionStrategy, Component, Injectable, Input, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { SelectableComponent } from "src/app/shared/components";
import { Question } from "src/app/core/stores/site-document/models";
import { LoginApi } from "src/app/core/http/login.api";
import { track } from "src/app/shared/rxjs";

@Component({
  selector: "company-select-question",
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
        [items]="tracking.data() | push"
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
export class CompanySelectComponent {
  companySvc = inject(CompanyService);
  tracking = this.companySvc.tracking.fire();

  @Input({ required: true })
  question!: Question;
}

@Injectable({ providedIn: "root" })
class CompanyService {
  loginApi = inject(LoginApi);
  tracking = track(() => this.loginApi.getCompanies());
}