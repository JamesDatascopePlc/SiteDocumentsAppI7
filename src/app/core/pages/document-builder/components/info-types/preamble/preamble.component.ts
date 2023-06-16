import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { importRxTemplate } from "src/app/shared/imports";

@Component({
  selector: "preamble",
  template: `
    <p *rxIf="subtitle.length > 0" class="text-center font-bold text-xl mb-2">{{ subtitle }}</p>
    <p *rxIf="text.length > 0" class="text-center font-bold whitespace-pre-line">{{ text }}</p>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...importRxTemplate()]
})
export class PreambleComponent {
  @Input()
  subtitle: string = "";

  @Input()
  text: string = "";
}
