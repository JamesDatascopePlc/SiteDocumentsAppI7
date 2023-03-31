import { StoryFn } from "@storybook/angular";
import { ActionerSelectComponent } from "./actioner-select.component";

export default {
  title: "Pages/Document-Builder/Input-Types/Actioner-Select",
  component: ActionerSelectComponent,
  argTypes: {
    title: { control: "text" },
    actioner: { control: "object" },
    actionerChange: { action: "actionerChange" }
  }
}

const Template: StoryFn<ActionerSelectComponent> = (args: ActionerSelectComponent) => ({
  props: args
});

export const Default = Template.bind({});