import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "remain-anonymous",
  template: `
    <ion-list>
      <ion-item>
        <ion-checkbox [(ngModel)]="isTicked" (ionChange)="isTickedChange.emit(isTicked)">
          Remain Anonymous?
        </ion-checkbox>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class RemainAnonymousComponent {
  @Input()
  isTicked: boolean = false;

  @Output()
  isTickedChange = new EventEmitter<boolean>();
}
