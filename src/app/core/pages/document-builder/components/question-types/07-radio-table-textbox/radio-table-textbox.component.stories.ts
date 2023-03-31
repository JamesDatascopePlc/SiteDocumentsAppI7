import { defaultQuestion } from ".storybook/default";
import { Meta, StoryFn } from "@storybook/angular";
import { RadioTableTextboxComponent } from "./radio-table-textbox.component";

export default {
  title: "Pages/Document-Builder/Question-Types/07-Radio-Table-Textbox",
  component: RadioTableTextboxComponent,
  argTypes: {
    question: { control: "object" }
  }
} as Meta;

const Template: StoryFn<RadioTableTextboxComponent> = (args: RadioTableTextboxComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    ...defaultQuestion,
    QuestionText: "Radio Table Question with textbox"
  }
}