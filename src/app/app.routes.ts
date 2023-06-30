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
  {
    path: "Form-Filler",
    loadComponent: () => import("./core/pages/document-builder/document-builder.page").then(m => m.DocumentBuilderPage)
  },
  {
    path: "Asset-Info",
    loadComponent: () => import("./core/pages/info/asset-info/asset-info.page").then(m => m.AssetInfoPage)
  }
];
