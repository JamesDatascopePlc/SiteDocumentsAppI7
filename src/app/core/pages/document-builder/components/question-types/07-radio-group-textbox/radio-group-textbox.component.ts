import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RadioGroupComponent } from "../02-radio-group/radio-group.component";
import { Question, Section } from "src/app/core/stores/site-document/models";

@Component({
  selector: "radio-group-textbox-question",
  template: `
    <radio-group-question [section]="section" [question]="question"></radio-group-question>
    <ion-textarea class="p-2" label="" rows="4" fill="outline" />
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    RadioGroupComponent
  ]
})
export class RadioGroupTextboxComponent {
  @Input({ required: true })
  section!: Section;

  @Input({ required: true })
  question!: Question;
}
