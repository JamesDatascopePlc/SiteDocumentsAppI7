import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RxIf } from "@rx-angular/template/if";

@Component({
  selector: "toggle-button",
  template: `
    <ion-button *rxIf="checked" (click)="change()" color="primary">
      <ion-icon *rxIf="icon != null" [name]="icon"></ion-icon>
    </ion-button>
    <ion-button *rxIf="!checked" (click)="change()">
      <ion-icon *rxIf="icon != null" name="{{icon}}-outline"></ion-icon>
    </ion-button>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    RxIf
  ]
})
export class ToggleButtonComponent {
  @Input()
  icon: Nullable<string>;
  
  @Input()
  checked: boolean = false;

  @Output()
  checkedChange = new EventEmitter<boolean>();

  change() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
