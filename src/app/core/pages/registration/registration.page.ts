import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { FormGroup, FormControl } from "@ngneat/reactive-forms";
import { AngularComponent } from "src/app/shared/lifecycles";
import { importRxTemplate } from "src/app/shared/imports";
import { UserStore } from "../../stores/user/user.store";

@Component({
  selector: 'app-registration',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center ion-text-wrap animate__animated animate__fadeInLeft animate__faster">Site Documents Registration</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [formGroup]="form" class="ion-padding animate__animated animate__fadeInLeft animate__faster">
      <ion-list>
        <ion-item>
          <ion-input 
            label="Registration Code" 
            labelPlacement="floating"
            formControlName="token"
            type="text" 
            clearInput>
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input 
            label="Pin"
            labelPlacement="floating"
            formControlName="pin" 
            type="tel" 
            clearInput>
          </ion-input>
        </ion-item>
      </ion-list>

      <ion-button 
        *rxLet="form.invalid$; let isInvalid" 
        [disabled]="isInvalid"
        expand="full">
        Submit
      </ion-button>
    </ion-content>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    ...importRxTemplate(),
    ReactiveFormsModule
  ]
})
export class RegistrationPage extends AngularComponent() {
  userStore = inject(UserStore);

  form = new FormGroup({
    token: new FormControl("", [
      Validators.required
    ]),
    pin: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  subscriptions = [
    this.userStore.getUser$.effect
      .pipe(this.takeUntilDestroyed())
      .subscribe()
  ];

  submit = () => this.userStore.getUser$.next({
    pin: this.form.value.pin,
    token: this.form.value.token
  });
}