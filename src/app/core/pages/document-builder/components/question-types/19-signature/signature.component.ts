import { ChangeDetectionStrategy, Component, Input, ViewChild } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question } from "src/app/core/stores/site-document/models";
import { QuestionTextComponent } from "../extras";
import { FormsModule } from "@angular/forms";
import { importRxTemplate } from "src/app/shared/imports";
import { SignaturePadComponent } from "src/app/shared/components";
import { useSignatureValidator } from "./validation/signature.validator";

@Component({
  selector: "signature-question",
  template: `
    <ion-list>
      <ion-item lines="none">
        <question-text [required]="question.Required">{{ question.QuestionText }}</question-text>
      </ion-item>

      <ion-item>
        <ion-input label="Print" labelPlacement="floating" [(ngModel)]="question.AnswerText" type="text" />
        <ion-button [id]="id" fill="clear" slot="end">
          <ion-icon name="create-outline" slot="icon-only" />
        </ion-button>
      </ion-item>
    </ion-list>

    <ion-modal #modal [trigger]="id">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title class="text-center">Signature</ion-title>

            <ion-buttons slot="end">
              <ion-button (click)="modal.dismiss()" [unpatch] fill="clear">
                <ion-icon name="close-outline" slot="icon-only" />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <signature-pad [points]="question.SignaturePoints" />
        </ion-content>
        
        <ion-footer>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button (click)="cancel()" color="danger" expand="full">
                  Clear
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button (click)="save(); modal.dismiss()" color="secondary" expand="full">
                  Save
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-footer>
      </ng-template>
    </ion-modal>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    FormsModule,
    QuestionTextComponent,
    SignaturePadComponent
  ]
})
export class SignatureComponent {
  id = crypto.randomUUID();
  
  @Input({ required: true })
  question!: Question;

  validator = useSignatureValidator(() => this.question);

  @ViewChild(SignaturePadComponent)
  signaturePad!: SignaturePadComponent;
  
  cancel() {
    this.signaturePad.clear();
  }

  save() {
    this.question.SignaturePoints = this.signaturePad.dataPoints();
    this.question.SignatureDataUrl = this.signaturePad.toDataUrl();
  }
}
