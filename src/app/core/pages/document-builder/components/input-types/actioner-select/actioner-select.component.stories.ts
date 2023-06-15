import { StoryFn } from "@storybook/angular";
import { ActionerSelectComponent } from "./actioner-select.component";
import { StorybookMeta } from ".storybook/storybook.typings";

export default {
  title: "Pages/Document-Builder/Input-Types/Actioner-Select",
  component: ActionerSelectComponent,
  argTypes: {
    title: { control: "text" },
    actioner: { control: "object" },
    actionerIdChange: { action: "actionerIdChange" }
  }
} as StorybookMeta<ActionerSelectComponent>;

const Template: StoryFn<ActionerSelectComponent> = (args: ActionerSelectComponent) => ({
  props: args
});

export const Default = Template.bind({});