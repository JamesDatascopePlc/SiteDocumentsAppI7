import { componentWrapperDecorator, applicationConfig, Preview } from "@storybook/angular";
import { IonicModule } from "@ionic/angular";
import { ErrorHandler, importProvidersFrom } from "@angular/core";
import { HTTP_INTERCEPTORS, provideHttpClient } from "@angular/common/http";
//import { provideHttpClientTesting } from "@angular/common/http/testing";
import { devTools } from "@ngneat/elf-devtools";
import "src/extensions";
import { AppErrorHandler } from "src/app/app.error-handler";
import { HttpErrorInterceptor } from "src/app/core/http/interceptors/http-error.interceptor";

devTools();

const preview: Preview = {
  globalTypes: {
    iosMode: {
      name: "IOS Mode",
      defaultValue: false
    }
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(IonicModule.forRoot({})),
        provideHttpClient(),
        //provideHttpClientTesting(),
        { provide: ErrorHandler, useClass: AppErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
      ]
    }),
    componentWrapperDecorator(story => `<ion-app>${story}</ion-app>`)
  ]
};

export default preview;
