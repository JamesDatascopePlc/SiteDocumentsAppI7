import { inject } from "@angular/core";
import { Platform } from "@ionic/angular";
import { memoize } from "lodash-es";

export const isMobileApp = memoize(() => {
  const platform = inject(Platform);

  return platform.is("cordova");
});