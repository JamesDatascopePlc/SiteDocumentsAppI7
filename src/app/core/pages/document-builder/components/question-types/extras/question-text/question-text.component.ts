import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "question-text",
  template: `
    <p class="ion-text-wrap">
      <ng-content></ng-content>
      <span *rxIf="required" class="text-red-500">*</span>
    </p>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...importRxTemplate()]
})
export class QuestionTextComponent {
  @Input()
  required: boolean = false;
}
