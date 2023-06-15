import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ErrorHandler, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { devTools } from '@ngneat/elf-devtools';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import './extensions';
import { AppErrorHandler } from './app/app.error-handler';
import { HttpErrorInterceptor } from './app/core/http/interceptors/http-error.interceptor';

if (environment.production) {
  enableProdMode();
} else {
  devTools();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    provideHttpClient(),
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
});
