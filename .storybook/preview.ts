import { componentWrapperDecorator, applicationConfig, Preview } from "@storybook/angular";
import { IonicModule } from "@ionic/angular";
import { importProvidersFrom } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
//import { provideHttpClientTesting } from "@angular/common/http/testing";
import { devTools } from "@ngneat/elf-devtools";

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
        //provideHttpClientTesting()
      ]
    }),
    componentWrapperDecorator(story => `<ion-app>${story}</ion-app>`)
  ]
};

export default preview;
