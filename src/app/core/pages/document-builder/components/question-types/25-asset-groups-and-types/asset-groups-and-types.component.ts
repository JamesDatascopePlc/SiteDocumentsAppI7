import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { importRxTemplate } from "src/app/shared/imports";
import { CameraCaptureComponent, FileUploadComponent, QuestionTextComponent } from "../extras";
import { SelectableComponent } from "src/app/shared/components";
import { Question } from "src/app/core/stores/site-document/models";
import { FusePipe } from "src/app/shared/pipes";
import { useAssetGroups, useAssetTypes } from "src/app/core/http/asset.api";

@Component({
  selector: "asset-groups-and-types-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
        <camera-capture *rxIf="question.CanHaveImg" class="m-0" slot="end" />
        <file-upload *rxIf="question.CanHaveFiles" class="m-0" slot="end" />
      </ion-item>
      
      <selectable 
        placeholder="Select"
        [title]="question.QuestionText"
        [items]="assetGroups.data() | push"
        itemValue="GroupId"
        itemText="GroupName"
        [canClear]="!question.Required" />

      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.CascadeOptionsText }}</question-text>
      </ion-item>

      <selectable
        placeholder="Select"
        [title]="question.CascadeOptionsText"
        [items]="assetTypes.data()
          | fuse: {
            search: question.OptionVal,
            keys: ['Id']
          }
          | push"
        itemValue="Id"
        itemText="Description"
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
    FileUploadComponent,
    FusePipe
  ]
})
export class AssetGroupsAndTypesComponent {
  @Input({ required: true })
  question!: Question;

  assetGroups = useAssetGroups();
  assetTypes = useAssetTypes();
}

