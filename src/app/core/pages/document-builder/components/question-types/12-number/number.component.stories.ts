import { defaultQuestion } from ".storybook/default";
import { StoryFn } from "@storybook/angular";
import { NumberComponent } from "./number.component";

export default {
  title: "Pages/Document-Builder/Question-Types/12-Number",
  component: NumberComponent,
  argTypes: {
    question: { control: "object" }
  }
}

const Template: StoryFn<NumberComponent> = (args: NumberComponent) => ({
  props: args
});

export const Default = Template.bind({});

Default.args = {
  question: {
    ...defaultQuestion,
    QuestionText: "Weight (kg)"
  }
}