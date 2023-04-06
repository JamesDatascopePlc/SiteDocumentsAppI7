import { StoryFn } from "@storybook/angular";
import { SelectComponent } from "./select.component";
import { defaultQuestion } from ".storybook/default";

export default {
  title: "Pages/Document-Builder/Question-Types/05-Select",
  component: SelectComponent,
  argTypes: {
    question: { control: "object" }
  }
}

const Template: StoryFn<SelectComponent> = (args: SelectComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    ...defaultQuestion,
    QuestionText: "Select an item"
  }
}