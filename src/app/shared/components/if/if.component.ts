import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IfModule } from "@rx-angular/template/if";

@Component({
  selector: 'if[condition]',
  styles: [`
    :host { display: contents }
  `],
  template:`
    <ng-content *rxIf="condition" select="[show]"></ng-content>
    <ng-content *rxIf="!condition" select="[else]"></ng-content>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IfModule
  ]
})
export class IfComponent {
  @Input() condition!: boolean;
}
