import { StoryFn } from "@storybook/angular";
import { RemainAnonymousComponent } from "./remain-anonymous.component";
import { StorybookMeta } from ".storybook/storybook.typings";

export default {
  title: "Pages/Document-Builder/Input-Types/Remain-Anonymous",
  component: RemainAnonymousComponent,
  argTypes: {
    isTicked: { control: "boolean" },
    isTickedChange: { action: "isTickedChange" }
  }
} as StorybookMeta<RemainAnonymousComponent>;

const Template: StoryFn<RemainAnonymousComponent> = (args: RemainAnonymousComponent) => ({
  props: args
});

export const Default = Template.bind({});