import { componentWrapperDecorator, applicationConfig, Preview } from "@storybook/angular";
import { IonicModule } from "@ionic/angular";
import { importProvidersFrom } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";

const preview: Preview = {
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
        provideHttpClient()
      ]
    }),
    componentWrapperDecorator(story => `<ion-app>${story}</ion-app>`)
  ]
};

export default preview;
