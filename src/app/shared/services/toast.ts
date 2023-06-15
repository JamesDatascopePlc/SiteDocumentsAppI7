import { inject } from "@angular/core";
import { ToastController, ToastOptions } from "@ionic/angular";

export function useToast(opts?: ToastOptions) {
  const toastCtrl = inject(ToastController);
  const toast = toastCtrl.create(opts);
  
  return {
    present: (opts?: Partial<HTMLIonToastElement>) => toast.then(t => Object
      .assign(t, opts)
      .present()
    )
  }
}