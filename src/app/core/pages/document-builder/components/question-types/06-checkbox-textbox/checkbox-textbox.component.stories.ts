import { StoryFn } from "@storybook/angular";
import { CheckboxTextboxComponent } from "./checkbox-textbox.component";
import { defaultQuestion } from ".storybook/default";

export default {
  title: "Pages/Document-Builder/Question-Types/06-Checkbox-Textbox",
  component: CheckboxTextboxComponent,
  argTypes: {
    question: { control: "object" }
  }
}

const Template: StoryFn<CheckboxTextboxComponent> = (args: CheckboxTextboxComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    ...defaultQuestion,
    QuestionText: "Is it keto-friendly and why?"
  }
}