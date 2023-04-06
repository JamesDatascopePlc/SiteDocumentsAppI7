import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Question, Section } from "src/app/core/stores/site-document/site-document.store";
import { RadioGroupComponent } from "../02-radio-group/radio-group.component";

@Component({
  selector: "radio-group-textbox-question[question]",
  template: `
    <radio-group-question [section]="section" [question]="question"></radio-group-question>

    <ion-list>
      <ion-item>
        <ion-textarea label="" rows="4"></ion-textarea>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    RadioGroupComponent
  ]
})
export class RadioGroupTextboxComponent {
  @Input()
  section!: Section;

  @Input()
  question!: Question;
}
