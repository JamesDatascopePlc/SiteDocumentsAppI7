import { Meta, StoryFn } from "@storybook/angular";
import { RemainAnonymousComponent } from "./remain-anonymous.component";

export default {
  title: "Pages/Document-Builder/Input-Types/Remain-Anonymous",
  component: RemainAnonymousComponent,
  argTypes: {
    isTicked: { control: "boolean" },
    isTickedChange: { action: "isTickedChange" }
  }
} as Meta;

const Template: StoryFn<RemainAnonymousComponent> = (args: RemainAnonymousComponent) => ({
  props: args
});

export const Default = Template.bind({});