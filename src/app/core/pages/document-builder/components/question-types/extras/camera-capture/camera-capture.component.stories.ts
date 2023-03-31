import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { CameraCaptureComponent } from "./camera-capture.component";

export default {
  title: "Pages/Document-Builder/Question-Types/Extras/Camera-Capture",
  component: CameraCaptureComponent,
  argTypes: {
    base64Img: { type: "string" },
    takePhoto: { action: "takePhoto" },
    removePhoto: { action: "removePhoto" }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
}

const Template: StoryFn<CameraCaptureComponent> = (args: CameraCaptureComponent) => ({
  props: args
});

export const Default = Template.bind({});