import { componentWrapperDecorator, moduleMetadata, Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { IonicModule } from "@ionic/angular";
import { HttpClientModule } from "@angular/common/http";

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
    moduleMetadata({
      imports: [IonicModule.forRoot(), HttpClientModule]
    }),
    componentWrapperDecorator(story => `<ion-app class='ion-padding'>${story}</ion-app>`)
  ]
};

export default preview;
