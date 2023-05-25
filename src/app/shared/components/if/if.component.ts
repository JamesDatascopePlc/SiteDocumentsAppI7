import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RxIf } from "@rx-angular/template/if";

@Component({
  selector: 'if',
  styles: [`
    :host { display: contents }
  `],
  template:`
    <ng-content *rxIf="condition" select="[show]"></ng-content>
    <ng-content *rxIf="!condition" select="[else]"></ng-content>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RxIf]
})
export class IfComponent {
  @Input({ required: true }) condition!: boolean;
}
