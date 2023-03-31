import { IonicModule } from "@ionic/angular";
import { moduleMetadata, StoryFn } from "@storybook/angular";
import { CameraComponent } from "./camera.component";

export default {
  title: "Shared/Camera",
  component: CameraComponent,
  argTypes: {
    fill: { 
      control: "select", 
      options: ["clear", "outline", "solid"], 
    },
    expand: {
      control: "select",
      options: ["block", "full", null]
    },
    color: { control: "text" }
  },
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()]
    })
  ]
}

const Template: StoryFn<CameraComponent> = (args: CameraComponent) => ({
  props: args,
  template: `
    <camera [fill]="fill" [expand]="expand" [color]="color">
      Add Image
    </camera>
  `
});

export const Default = Template.bind({});

Default.args = {
  fill: "solid"
}