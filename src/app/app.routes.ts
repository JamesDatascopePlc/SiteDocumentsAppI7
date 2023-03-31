import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: "Registration",
    pathMatch: 'full',
  },
  {
    path: "Registration",
    loadComponent: () => import("./core/pages/registration/registration.page").then(m => m.RegistrationPage)
  },
];
